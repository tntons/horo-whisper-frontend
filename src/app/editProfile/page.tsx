'use client'

import React, { useState, useEffect } from "react"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { apiFetch } from "@/lib/api/fetch"

export default function EditProfile() {
  const [name, setName] = useState("")
  const [dateOfBirth, setDateOfBirth] = useState("")
  const [timeOfBirth, setTimeOfBirth] = useState("")
  const [whatever, setWhatever] = useState("")
  const [something, setSomething] = useState("")
  const [loadingSubmit, setLoadingSubmit] = useState(false)
  const router = useRouter()

  // load existing profile & prediction attributes on mount
  useEffect(() => {
    async function loadProfile() {
      try {
        const res = await apiFetch(`/customers/profile`)
        console.log('response', res)
        const user = res.data.user
        console.log('user', user)
        setName(user.firstName || "")
        setDateOfBirth(user.birthDate || "")
        setTimeOfBirth(user.birthTime || "")
        // setWhatever(prediction?.birthPlace || "")
        // setSomething(prediction?.relationship || "")
      } catch (err) {
        console.error(err)
        toast.error("Failed to load profile")
      }
    }
    loadProfile()
  }, [])

  const handleSubmit = async () => {
    setLoadingSubmit(true)
    try {
      // update basic profile
      await apiFetch('/customers/profile', {
        method: 'PATCH',
        body: JSON.stringify({
          firstName: name,
          birthDate: dateOfBirth,
          birthTime: timeOfBirth
        })
      })
      // update prediction attributes
      await apiFetch('/customers/prediction-attributes', {
        method: 'PATCH',
        body: JSON.stringify({
          birthPlace: whatever,
          relationship: something
        })
      })
      toast.success("You've successfully updated your profile!", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        className: "custom-toast"
      })
    } catch (err) {
      console.error(err)
      toast.error("Update failed")
    } finally {
      setLoadingSubmit(false)
    }
  }

  const handleLogout = async () => {
    localStorage.removeItem("APP_TOKEN")
    await signOut({ callbackUrl: "/login" })
  }

  return (
    <div className="flex flex-col items-center w-full h-full bg-[#FEF0E5] px-4 py-6">
      <ToastContainer />

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="self-end mb-4 text-sm text-red-600 hover:underline"
      >
        Logout
      </button>

      {/* Edit Profile Section */}
      <div className="w-[75%] mt-4">
        <h2 className="text-xl font-bold text-[#171717] mb-4">Edit Profile</h2>
        <div className="flex flex-col text-[14px] gap-2">
          <div>
            <label className="block mb-1 font-normal text-[#171717]">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>
          <div className="flex justify-between text-[14px] gap-4">
            <div className="flex-1">
              <label className="block mb-1 font-normal text-[#171717]">
                Date of Birth
              </label>
              <input
                type="date"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>
            <div className="flex-1">
              <label className="block mb-1 text-[14px] font-normal text-[#171717]">
                Time of Birth
              </label>
              <input
                type="time"
                value={timeOfBirth}
                onChange={(e) => setTimeOfBirth(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Edit Prediction Attributes Section */}
      <div className="w-[75%] mt-10">
        <h2 className="text-xl font-bold text-[#171717] mb-4">
          Edit Prediction Attributes
        </h2>
        <div className="flex flex-col text-[14px] gap-2">
          <div>
            <label className="block mb-1 font-normal text-[#171717]">
              Birth Place
            </label>
            <input
              type="text"
              value={whatever}
              onChange={(e) => setWhatever(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>
          <div>
            <label className="block mb-1 font-normal text-[#171717]">
              Relationship
            </label>
            <input
              type="text"
              value={something}
              onChange={(e) => setSomething(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>
        </div>
      </div>

      {/* Done Button */}
      <button
        onClick={handleSubmit}
        disabled={loadingSubmit}
        className="mt-14 w-[60%] h-[46px] bg-blue01 text-white text-[18px] font-normal py-3 rounded-lg flex items-center justify-center disabled:opacity-50"
      >
        {loadingSubmit ? "Updating..." : "Done"}
      </button>
    </div>
  )
}