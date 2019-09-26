import React from 'react'
import ImageCard2 from '../../images/ImageCard2'

export default function CardItem({ createPost }) {
    const text = "What was the best moment you've had while on vacation?"
    return (
        <article className="post-question-card animated fadeIn card-2">
            <header>
                <ImageCard2 />
            </header>
            <main className="mt-2 mb-2">
                <h5>{text}</h5>
            </main>
            <footer>
                <button className="card-2-button" onClick={createPost.bind(null, text)}><i className="fas fa-edit"></i></button>
            </footer>
        </article>
    )
}
