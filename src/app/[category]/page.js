import React from 'react';

export default function CategoryPage({ params }) {
    const { category } = params;

    return (
        <main>
            <h1>Category: {category}</h1>
            {/* TODO: Fetch and display category-specific content here */}
            <section>
                <p>This is the {category} category page.</p>
            </section>
        </main>
    );
}