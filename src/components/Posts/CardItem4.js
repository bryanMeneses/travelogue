import React from 'react'
import ImageCard4 from '../../images/ImageCard4'

export default function CardItem4({ createPost }) {
    const text = "Do you prefer solo travel or with someone else?"
    return (
        <article className="post-question-card animated fadeIn card-4">
            <header>
                <ImageCard4 />
            </header>
            <main className="mt-2 mb-2">
                <h5>{text}</h5>
            </main>
            <footer>
                <button className="card-4-button" onClick={createPost.bind(null, text)}><i className="fas fa-edit"></i></button>
            </footer>
        </article>
    )
}
