'use client'

import React, { useState, useEffect } from "react"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useParams, useRouter } from "next/navigation"
import { MdOutlineStar } from "react-icons/md";
import { apiFetch } from "@/lib/api/fetch"
import ReviewSuccessBox from "./ReviewSuccessBox"

export default function Review() {
    const router = useRouter()
    const {sessionId} = useParams();
    const [rating, setRating] = useState(0)
    const [hover, setHover] = useState(0)
    const [review, setReview] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isReviewSuccess, setIsReviewSuccess] = useState(false)
    const [tellerName, setTellerName] = useState<string>("")

    const fetchSessionData = async () => {
        try {
            const response = await apiFetch(`/tellers/get-teller-info/${sessionId}`)
            const data = await response.data
            setTellerName(data.username)
        } catch (error) {
            console.error("Error fetching session data:", error)
        }
    }

    useEffect(() => {
        fetchSessionData()
    }, [])
    
    const handleSubmit = async () => {
        setIsSubmitting(true)
        try {
            const response = await apiFetch('/tellers/create-review', {
                method: 'POST',
                body: JSON.stringify({
                    "sessionId": parseInt(sessionId as string),
                    "rating": rating,
                    "comment": review
                })
            })
            setIsReviewSuccess(true)
        } catch (error) {
            toast.error("Failed to submit review")
        } finally {
            setIsSubmitting(false)
        }
    }


    return (
        <div className="flex flex-col items-center w-full h-full bg-[#FEF0E5] py-6">
            <ToastContainer />

            {/* Title */}
            <h1 className="text-2xl font-bold text-[#171717] mb-8">Session Review</h1>

            {/* Rating Stars */}
            <div className="flex gap-2 mb-8">
                {[...Array(5)].map((_, index) => {
                    const ratingValue = index + 1
                    return (
                        <MdOutlineStar
                            key={index}
                            className="cursor-pointer"
                            color={ratingValue <= (hover || rating) ? "#FFD700" : "#e4e5e9"}
                            onClick={() => setRating(ratingValue)}
                            onMouseEnter={() => setHover(ratingValue)}
                            onMouseLeave={() => setHover(rating)}
                            size={40}
                        />
                    )
                })}
            </div>

            {/* Review Text Area */}
            <div className="w-[75%]">
                <label className="block mb-4 text-lg font-normal text-[#171717]">
                    Write me a review!
                </label>
                <textarea
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    placeholder={`How was your session with ${tellerName} ?`}
                    className="w-full h-60 border border-gray-300 rounded-lg px-3 py-2 resize-none focus:outline-none focus:border-blue01"
                />
            </div>

            {/* Submit Button */}
            <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="mt-8 w-[60%] h-[46px] bg-blue01 text-white text-[18px] font-normal py-3 rounded-lg flex items-center justify-center disabled:opacity-50"
            >
                {isSubmitting ? "Submitting..." : "Submit Review"}
            </button>
            {isReviewSuccess && <ReviewSuccessBox />}
        </div>
    )
}


