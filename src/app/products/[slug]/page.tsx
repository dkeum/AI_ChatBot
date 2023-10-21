"use client";

import { useSearchParams } from 'next/navigation';


export default function AIChatbot({ params }: { params: { slug: string } }) {
 

    console.log(params);

    return (
        <div>
            hi where am I being rendered {}
        </div>
    );
}
