"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { fetchPublicBulletins } from "@/lib/data"
import type { BulletinType } from "@/lib/types"

export function PublicBulletin() {
  const [bulletins, setBulletins] = useState<BulletinType[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedBulletin, setSelectedBulletin] = useState<BulletinType | null>(null)

  useEffect(() => {
    const getBulletins = async () => {
      try {
        const data = await fetchPublicBulletins()
        setBulletins(data)
        if (data.length > 0) {
          setSelectedBulletin(data[0])
        }
      } catch (error) {
        console.error("Failed to fetch bulletins:", error)
      } finally {
        setLoading(false)
      }
    }

    getBulletins()
  }, [])

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Parish Bulletin</h3>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1 space-y-4">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </div>
          <div className="md:col-span-2">
            <Skeleton className="h-64 w-full" />
          </div>
        </div>
      ) : bulletins.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1 space-y-2">
            {bulletins.map((bulletin) => (
              <Card
                key={bulletin.id}
                className={`cursor-pointer transition-colors ${selectedBulletin?.id === bulletin.id ? "border-primary" : ""}`}
                onClick={() => setSelectedBulletin(bulletin)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">{bulletin.title}</h4>
                    {bulletin.isNew && (
                      <Badge variant="outline" className="bg-primary/10 text-primary">
                        New
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {new Date(bulletin.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="md:col-span-2">
            {selectedBulletin ? (
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{selectedBulletin.title}</CardTitle>
                      <CardDescription>
                        {new Date(selectedBulletin.date).toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </CardDescription>
                    </div>
                    {selectedBulletin.pdfUrl && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={selectedBulletin.pdfUrl} target="_blank" rel="noopener noreferrer">
                          <FileText className="mr-2 h-4 w-4" />
                          PDF Version
                        </a>
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="prose max-w-none">
                    <div dangerouslySetInnerHTML={{ __html: selectedBulletin.content }} />
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="p-6 text-center">
                  <p className="text-muted-foreground">Select a bulletin to view its contents.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      ) : (
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-muted-foreground">No bulletins available at this time.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

