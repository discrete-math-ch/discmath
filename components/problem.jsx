import React from 'react';
import { MDXProvider } from 'nextra/mdx'

const Problem = ({ title, description, question }) => {
    return (
        <div>
            <h1>{title}</h1>
            <p>{description}</p>
            <MDXProvider>
              {question}
            </MDXProvider>
        </div>
    );
};

export default Problem;