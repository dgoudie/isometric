import {
    GetServerSideProps,
    GetServerSidePropsContext,
    GetServerSidePropsResult,
    NextApiHandler,
    NextApiRequest,
    NextApiResponse,
    PreviewData,
} from 'next';

import { IncomingMessage } from 'http';
import { NextApiRequestCookies } from 'next/dist/server/api-utils';
import { ParsedUrlQuery } from 'querystring';
import jwt from 'jsonwebtoken';

type GetServerSidePropsWithUserId<
    P extends { [key: string]: any } = { [key: string]: any },
    Q extends ParsedUrlQuery = ParsedUrlQuery,
    D extends PreviewData = PreviewData
> = (
    context: GetServerSidePropsContext<Q, D>,
    userId: string
) => Promise<GetServerSidePropsResult<P>>;

type NextApiHandlerWithUserId<T> = (
    req: NextApiRequest,
    res: NextApiResponse<T>,
    userId: string
) => void | Promise<void>;

export const getServerSidePropsWithUserId = <
    P extends { [key: string]: any } = { [key: string]: any }
>(
    cb: GetServerSidePropsWithUserId<P>
): GetServerSideProps<P> => {
    return async (context) => {
        const userId = getUserId(context.req);
        return cb(context, userId);
    };
};

export const apiRouteWithUserId = <T = any>(
    cb: NextApiHandlerWithUserId<T>
): NextApiHandler<T> => {
    return async (req, res) => {
        const userId = getUserId(req);
        return cb(req, res, userId);
    };
};

const getUserId = (
    req: IncomingMessage & {
        cookies: NextApiRequestCookies;
    }
) => {
    let userId: string | undefined;
    if (process.env.NODE_ENV === 'development') {
        userId = process.env.USER_ID;
        if (!userId) {
            throw new Error('process.env.USER_ID not populated');
        }
    } else {
        const authToken = req.cookies.authorization;
        const token = jwt.decode(authToken);
        if (!token?.sub) {
            throw new Error('Invalid authorization cookie');
        }
        userId = token.sub as string;
    }
    return userId;
};
