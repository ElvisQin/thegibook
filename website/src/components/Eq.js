/* eslint-disable react/prop-types,import/no-unresolved */
import React, { Children } from 'react'

export default function Eq({ id, num }) {
    return (
        <p align="right">（式{num}）</p>
    )
}