export interface ReadableResource<T> {
  read(): T;
}

export const emptyReadableResource = (): ReadableResource<any> => {
  return {
    read() {
      throw Promise.resolve();
    },
  };
};

function wrapPromise<T>(promise: Promise<T>): ReadableResource<T> {
  let status = 'pending';
  let result: T;
  let suspender = promise.then(
    (r) => {
      status = 'success';
      result = r;
    },
    (e) => {
      status = 'error';
      result = e;
    }
  );
  return {
    read() {
      if (status === 'pending') {
        throw suspender;
      } else if (status === 'error') {
        throw result;
      } else if (status === 'success') {
        return result;
      }
      throw new Error('unexpected promise state');
    },
  };
}

export const fetchFromApi = async <T>(
  path: string,
  params?: URLSearchParams | Record<string, string>,
  headers?: HeadersInit
): Promise<T> => {
  if (!!params) {
    if (!(params instanceof URLSearchParams)) {
      params = new URLSearchParams(params);
    }
  }
  const res = await fetch(`${path}?${params ? params.toString() : ''}`, {
    credentials: 'same-origin',
    headers,
  });
  if (res.headers.get('content-length') === '0') {
    return Promise.resolve(null) as unknown as Promise<T>;
  }
  return res.json() as Promise<T>;
};

export const fetchFromApiAsReadableResource = <T>(
  path: string,
  params?: URLSearchParams | Record<string, string>,
  headers?: HeadersInit
) => {
  if (!!params) {
    if (!(params instanceof URLSearchParams)) {
      params = new URLSearchParams(params);
    }
  }
  return wrapPromise(fetchFromApi<T>(path, params, headers));
};
