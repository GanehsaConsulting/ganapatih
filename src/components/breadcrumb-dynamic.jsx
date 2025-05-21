"use client"
import React from 'react';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const BreadcrumbDynamic = () => {
    const path = usePathname();

    const pathnames = path
        .split('/')
        .filter((x) => x)
        .map((segment) => segment.replace(/-/g, ' '));

    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <Link href="/">
                            Beranda
                        </Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>
                {pathnames.map((value, index) => {
                    const to = `/${pathnames.slice(0, index + 1).join('/')}`;
                    const isLast = index === pathnames.length - 1;
                    return (
                        <React.Fragment key={to}>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                {isLast ? (
                                    <BreadcrumbPage className="capitalize font-medium">
                                        {value.charAt(0).toUpperCase() + value.slice(1)}
                                    </BreadcrumbPage>
                                ) : (
                                    <BreadcrumbLink asChild>
                                        <Link href={to} className='capitalize'>
                                            {value.charAt(0).toUpperCase() + value.slice(1)}
                                        </Link>
                                    </BreadcrumbLink>
                                )}
                            </BreadcrumbItem>
                        </React.Fragment>
                    );
                })}
            </BreadcrumbList>
        </Breadcrumb>
    );
};

