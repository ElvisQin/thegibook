/* eslint-disable react/prop-types,import/no-unresolved */
import React, { Children } from 'react'
import useBaseUrl from '@docusaurus/useBaseUrl'

export default function Figure({ id, num, caption, children }) {
    return (
        <div>
            <div align="center" id={id}>
                {children}
            </div>
            <p align="left"><b>图（{num}）：</b>{caption}</p>
        </div>
    )
}