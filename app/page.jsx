import React from 'react'

import Feed from '@components/Feed';

const Home = () => {
    return (
        
        <section className='w-full flex-center flex-col'>
            <h1 className='head_text text-center '>
                Discuzz FindMe
                <br className='max-md:hidden' />
                <span className='orange_gradient text-center'> Find your network</span>
            </h1>
            <p className='desc text-center'>FindMe is a networking platform designed to
                connect you with the right people. Whether you're looking for collaborators,
                mentors, or new friends, FindMe helps you build meaningful connections and
                foster lasting relationships.
            </p>

            <Feed />

        </section>
    )
}

export default Home
