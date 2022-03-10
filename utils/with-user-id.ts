import {
    GetServerSideProps,
    GetServerSidePropsContext,
    GetServerSidePropsResult,
    PreviewData,
} from 'next';

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

export const withUserId = <
    P extends { [key: string]: any } = { [key: string]: any }
>(
    cb: GetServerSidePropsWithUserId<P>
): GetServerSideProps<P> => {
    return async (context) => {
        let userId: string | undefined;
        if (process.env.NODE_ENV === 'development') {
            userId = process.env.USER_ID;
            if (!userId) {
                throw new Error('process.env.USER_ID not populated');
            }
        } else {
            const authToken = context.req.cookies.authorization;
            const token = jwt.decode(authToken);
            if (!token?.sub) {
                throw new Error('Invalid authorization cookie');
            }
            userId = token.sub as string;
        }

        return cb(context, userId);
    };
};
