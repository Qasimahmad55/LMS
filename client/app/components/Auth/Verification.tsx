'use client'
import React, { FC, useRef, useState } from 'react'

type Props = {
    setRoute: (route: string) => void
}

type VerifyNumber = {
    "0": string;
    "1": string;
    "2": string;
    "3": string;
}

const Verification: FC<Props> = ({ setRoute }) => {
    const [invalidError, setInvalidError] = useState(false);

    const [verifyNumber, setVerifyNumber] = useState<VerifyNumber>({
        0: "",
        1: "",
        2: "",
        3: "",
    });

    const inputRefs = [
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
    ];

    const verificationHandler = async () => {
        console.log('test');
    }

    const handleInputChange = (index: number, value: string) => {
        setInvalidError(false)
        const newVerifyNumber = { ...VerifyNumber, [index]: value }
    }
    return (
        <div>Verification</div>
    )
}

export default Verification