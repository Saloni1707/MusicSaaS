"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { ThumbsUp, ThumbsDown, Music } from "lucide-react"
import Link from "next/link"
import { signIn, signOut, useSession } from "next-auth/react"


export default function Component() {
        const session = useSession(); 
        <nav className="ml-auto flex gap-4 sm:gap-6">
            <Link className="flex items-center justify-center" href="#">
            <Music className="h-6 w-6 text-teal-400" />
            <span className="ml-2 text-2xl font-bold text-teal-400">StreamChoice</span>
            </Link>
            <div className="flex justify-between px-80">
            {session.data?.user && <Button className="bg-teal-500 hover:bg-teal-600 text-gray-900 font-semibold" onClick={()=> signOut()}>Logout</Button>}
            {!session.data?.user && <Button className="bg-teal-500 hover:bg-teal-600 text-gray-900 font-semibold" onClick={()=>signIn()}>SignIn</Button>}
            {/* The ?. operator is called the optional chaining operator */}
            </div>
        </nav>
  const [videoLink, setVideoLink] = useState("")
  const [queue, setQueue] = useState([
    { id: 1, title: "Never Gonna Give You Up", votes: 5, thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/default.jpg" },
    { id: 2, title: "Despacito", votes: 3, thumbnail: "https://img.youtube.com/vi/kJQP7kiw5Fk/default.jpg" },
    { id: 3, title: "Gangnam Style", votes: 1, thumbnail: "https://img.youtube.com/vi/9bZkp7q19f0/default.jpg" },
  ])

  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically process the video link
    console.log("Submitted video link:", videoLink)
    setVideoLink("")
  }

  const handleVote = (id: number, increment: number) => {
    setQueue(
      queue.map((item) =>
        item.id === id ? { ...item, votes: item.votes + increment } : item
      ).sort((a, b) => b.votes - a.votes)
    )
  }

  fetch("/api/streams/upvote",{
    method:"POST",
    body:JSON.stringify({
      streamId : queue[0].id
    })
  })

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-center mb-8">Song Voting Queue</h1>

        {/* Currently playing video */}
        <div className="aspect-video">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        {/* Input for new video */}
        <Card className="bg-gray-800 border-gray-700">
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4 p-4">
              <Input
                type="text"
                placeholder="Paste YouTube video link here"
                value={videoLink}
                onChange={(e) => setVideoLink(e.target.value)}
                className="bg-gray-700 text-white border-gray-600"
              />
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                Add to Queue
              </Button>
            </form>
            {videoLink && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2">Preview:</h3>
                <img
                  src={`https://img.youtube.com/vi/${videoLink.split("v=")[1]}/0.jpg`}
                  alt="Video thumbnail"
                  className="w-full h-auto rounded-md"
                />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Queue of upcoming videos */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Upcoming Songs</h2>
          {queue.map((item) => (
            <Card key={item.id} className="bg-gray-800 border-gray-700">
              <CardContent className="flex items-center space-x-4 p-4">
                <img src={item.thumbnail} alt={item.title} className="w-24 h-auto rounded-md" />
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleVote(item.id, 1)}
                    className="text-green-500 border-green-500 hover:bg-green-500 hover:text-white"
                  >
                    <ThumbsUp className="h-4 w-4 mr-1" />
                    <span>{item.votes}</span>
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleVote(item.id, -1)}
                    className="text-red-500 border-red-500 hover:bg-red-500 hover:text-white"
                  >
                    <ThumbsDown className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <br/>
      <div className="flex justify-content-center">
        {session.data?.user && <Button className="bg-teal-500 hover:bg-teal-600 text-gray-900 font-semibold" onClick={()=> signOut()}>Logout</Button>}
        {!session.data?.user && <Button className="bg-teal-500 hover:bg-teal-600 text-gray-900 font-semibold" onClick={()=>signIn()}>SignIn</Button>}
        {/* The ?. operator is called the optional chaining operator */}
      </div>
    </div>
  )
}