import React from 'react';
import { BreadcrumbDynamic } from '@/components/breadcrumb-dynamic';
import { Sidebar } from '@/components/sidebar';

export default function CategoryPage() {

    return (
        <>
            <section className='margin my-5'>
                <BreadcrumbDynamic />
            </section>
            <main className='margin grid grid-cols-9'>
                <section className='col-span-2'>
                    <Sidebar />
                </section>
                <section className='col-span-7'>

                </section>
            </main>
        </>
    );
}