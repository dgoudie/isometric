import type { GetServerSideProps, NextPage } from 'next';

import AppBarWithAppHeaderLayout from '../../components/AppBarWithAppHeaderLayout/AppBarWithAppHeaderLayout';
import Head from 'next/head';
import React from 'react';

type Props = {};

const Exercises: NextPage<Props> = ({}) => {
    return (
        <AppBarWithAppHeaderLayout>
            <Head>
                <title>Workouts | {process.env.APP_NAME}</title>
            </Head>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Scelerisque viverra mauris in aliquam sem. Odio euismod lacinia at
            quis risus sed vulputate odio. Velit scelerisque in dictum non
            consectetur a. Nibh venenatis cras sed felis eget velit aliquet
            sagittis. Maecenas accumsan lacus vel facilisis volutpat est velit
            egestas dui. Dui nunc mattis enim ut tellus elementum sagittis vitae
            et. Arcu odio ut sem nulla pharetra diam sit amet nisl. Felis
            imperdiet proin fermentum leo vel orci porta non. Orci ac auctor
            augue mauris. Nullam non nisi est sit amet facilisis magna. Arcu ac
            tortor dignissim convallis. Ut morbi tincidunt augue interdum. Diam
            quis enim lobortis scelerisque fermentum dui. Pulvinar mattis nunc
            sed blandit libero. Nisi quis eleifend quam adipiscing vitae proin
            sagittis. A iaculis at erat pellentesque adipiscing commodo elit at
            imperdiet. Bibendum enim facilisis gravida neque. Mi sit amet mauris
            commodo quis imperdiet massa tincidunt. Libero justo laoreet sit
            amet. Id semper risus in hendrerit gravida rutrum quisque. At erat
            pellentesque adipiscing commodo elit at. In pellentesque massa
            placerat duis ultricies lacus sed turpis. Auctor augue mauris augue
            neque gravida in fermentum et sollicitudin. Integer malesuada nunc
            vel risus commodo viverra maecenas accumsan lacus. Vulputate odio ut
            enim blandit volutpat maecenas. Nisi est sit amet facilisis magna
            etiam. Mus mauris vitae ultricies leo integer malesuada nunc vel
            risus. Eleifend donec pretium vulputate sapien nec sagittis aliquam
            malesuada. Convallis tellus id interdum velit laoreet id donec.
            Etiam dignissim diam quis enim. Dignissim sodales ut eu sem integer
            vitae justo. Viverra nibh cras pulvinar mattis. Eget duis at tellus
            at urna condimentum. Elementum curabitur vitae nunc sed velit
            dignissim sodales. Risus quis varius quam quisque id diam vel quam
            elementum. Scelerisque felis imperdiet proin fermentum leo. Suscipit
            tellus mauris a diam maecenas sed. Mollis nunc sed id semper.
            Aliquet eget sit amet tellus. Quisque non tellus orci ac auctor
            augue. Blandit cursus risus at ultrices mi. Eu consequat ac felis
            donec et odio pellentesque. Viverra mauris in aliquam sem fringilla
            ut morbi tincidunt. Nisi scelerisque eu ultrices vitae auctor eu.
            Augue neque gravida in fermentum et sollicitudin ac. Interdum varius
            sit amet mattis vulputate enim. Vel turpis nunc eget lorem dolor sed
            viverra ipsum. Amet consectetur adipiscing elit duis. Aenean sed
            adipiscing diam donec adipiscing tristique risus nec feugiat. Quis
            viverra nibh cras pulvinar mattis nunc sed blandit libero. Faucibus
            interdum posuere lorem ipsum dolor. Id neque aliquam vestibulum
            morbi blandit cursus risus at ultrices. Neque ornare aenean euismod
            elementum nisi quis. Velit euismod in pellentesque massa placerat.
            Ornare lectus sit amet est placerat. Arcu non odio euismod lacinia
            at quis. Non enim praesent elementum facilisis leo vel. Est sit amet
            facilisis magna etiam tempor. Orci a scelerisque purus semper eget
            duis at. Faucibus scelerisque eleifend donec pretium vulputate
            sapien nec sagittis. Turpis nunc eget lorem dolor sed viverra ipsum
            nunc. In hac habitasse platea dictumst quisque. Blandit cursus risus
            at ultrices mi. Quis varius quam quisque id diam vel quam elementum.
            Adipiscing diam donec adipiscing tristique risus nec feugiat in
            fermentum. Eleifend quam adipiscing vitae proin sagittis. Egestas
            dui id ornare arcu odio. Non odio euismod lacinia at quis risus.
            Lacus sed turpis tincidunt id aliquet risus feugiat in. Sed libero
            enim sed faucibus turpis. Tellus rutrum tellus pellentesque eu.
            Vestibulum rhoncus est pellentesque elit ullamcorper dignissim cras
            tincidunt lobortis.
        </AppBarWithAppHeaderLayout>
    );
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
    return { props: {} };
};

export default Exercises;
