import React from 'react'
import ImageCard3 from '../../images/ImageCard3'

export default function CardItem3({ createPost }) {
    const text = 'Most delicious thing you\'ve eaten abroad?'
    return (
        <article className="post-question-card animated fadeIn card-3">
            <header>
                <ImageCard3 />
            </header>
            <main className="mt-2 mb-2">
                <h5>{text}</h5>
            </main>
            <footer className='mt-4'>
                <button className="card-3-button" onClick={createPost.bind(null, text)}><i className="fas fa-edit"></i></button>
            </footer>
        </article>
    )
}
