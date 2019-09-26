import React from 'react'
import ImageCard1 from '../../images/ImageCard1'

export default function CardItem({ createPost }) {
    const text = 'What was the first trip you ever took?'
    return (
        <article className="post-question-card animated fadeIn card-1">
            <header>
                <ImageCard1 />
            </header>
            <main className="mt-2 mb-2">
                <h5>{text}</h5>
            </main>
            <footer className="mt-4">
                <button className="card-1-button" onClick={createPost.bind(null, text)} ><i className="fas fa-edit"></i></button>
            </footer>
        </article>
    )
}
