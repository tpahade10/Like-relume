"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import {
  Target,
  Users,
  TrendingUp,
  MessageSquare,
  Hash,
  Award,
  Search,
  Instagram,
  Twitter,
  CheckCircle,
  AlertCircle,
  Sparkles,
  ArrowRight,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Sidebar } from "@/components/sidebar"

type CompetitorData = {
  name: string
  platform: "instagram" | "twitter" | "reddit"
  followers: string
  engagement: string
  topHashtags: string[]
  recentPosts: { content: string; engagement: number }[]
  strengths: string[]
  weaknesses: string[]
}

type MarketingInsights = {
  competitors: CompetitorData[]
  recommendations: string[]
  contentStrategy: { theme: string; frequency: string; platforms: string[] }[]
  targetAudience: { segment: string; size: string; interests: string[] }[]
  hashtagStrategy: { tag: string; volume: string; competition: string }[]
}

export default function MarketingPage() {
  const [productName, setProductName] = useState("")
  const [productDescription, setProductDescription] = useState("")
  const [targetMarket, setTargetMarket] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [insights, setInsights] = useState<MarketingInsights | null>(null)
  const [activeTab, setActiveTab] = useState<"competitors" | "strategy" | "audience">("competitors")

  const handleAnalyze = async () => {
    setIsAnalyzing(true)

    // Simulate AI analysis
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Mock data - in production, this would call the AI API
    const mockInsights: MarketingInsights = {
      competitors: [
        {
          name: "CompetitorX",
          platform: "instagram",
          followers: "45.2K",
          engagement: "4.8%",
          topHashtags: ["#saas", "#productivity", "#tech", "#startup"],
          recentPosts: [
            { content: "New feature launch: AI-powered insights 🚀", engagement: 892 },
            { content: "Customer success story with Fortune 500 company", engagement: 1240 },
            { content: "Behind the scenes: Our product development process", engagement: 654 },
          ],
          strengths: ["Strong visual content", "High engagement rate", "Consistent posting schedule"],
          weaknesses: ["Limited video content", "Narrow audience targeting", "Minimal user-generated content"],
        },
        {
          name: "MarketLeader",
          platform: "twitter",
          followers: "128K",
          engagement: "3.2%",
          topHashtags: ["#b2bsaas", "#innovation", "#ai", "#business"],
          recentPosts: [
            { content: "Thread: 10 ways to optimize your workflow with AI", engagement: 2340 },
            { content: "We're hiring! Join our remote-first team", engagement: 876 },
            { content: "Product update: Enhanced analytics dashboard", engagement: 1450 },
          ],
          strengths: ["Thought leadership content", "Active community engagement", "Strong brand voice"],
          weaknesses: ["Inconsistent posting times", "Limited platform diversification", "Low video adoption"],
        },
        {
          name: "StartupRival",
          platform: "reddit",
          followers: "23K",
          engagement: "6.5%",
          topHashtags: ["saas", "entrepreneur", "productlaunch", "feedback"],
          recentPosts: [
            { content: "We launched our product today! Here's what we learned", engagement: 456 },
            { content: "Ask me anything about building a SaaS from scratch", engagement: 789 },
            { content: "Free tool: Marketing analytics dashboard", engagement: 1120 },
          ],
          strengths: ["Authentic community engagement", "High-value content", "Transparent communication"],
          weaknesses: ["Limited brand awareness", "Sporadic posting", "Single platform focus"],
        },
      ],
      recommendations: [
        "Increase posting frequency on Instagram to 5x per week for better algorithm visibility",
        "Launch a Twitter thread series on industry insights to establish thought leadership",
        "Create short-form video content (Reels/TikTok) to capture younger demographics",
        "Implement user-generated content campaigns to boost authenticity and trust",
        "Engage with Reddit communities through valuable contributions, not just promotions",
        "Develop a consistent hashtag strategy across all platforms for brand recognition",
      ],
      contentStrategy: [
        {
          theme: "Product Education",
          frequency: "3x weekly",
          platforms: ["Instagram", "LinkedIn", "YouTube"],
        },
        {
          theme: "Customer Success Stories",
          frequency: "2x weekly",
          platforms: ["Twitter", "LinkedIn", "Blog"],
        },
        {
          theme: "Behind the Scenes",
          frequency: "1x weekly",
          platforms: ["Instagram Stories", "TikTok"],
        },
        {
          theme: "Industry Insights",
          frequency: "Daily",
          platforms: ["Twitter", "LinkedIn"],
        },
      ],
      targetAudience: [
        {
          segment: "Tech-Savvy Founders",
          size: "~250K",
          interests: ["startups", "productivity", "automation", "AI"],
        },
        {
          segment: "Product Managers",
          size: "~180K",
          interests: ["product development", "user research", "agile", "roadmaps"],
        },
        {
          segment: "Marketing Professionals",
          size: "~320K",
          interests: ["growth hacking", "analytics", "content strategy", "SEO"],
        },
      ],
      hashtagStrategy: [
        { tag: "#saas", volume: "1.2M posts", competition: "High" },
        { tag: "#productivity", volume: "890K posts", competition: "High" },
        { tag: "#techstartup", volume: "340K posts", competition: "Medium" },
        { tag: "#buildinpublic", volume: "180K posts", competition: "Medium" },
        { tag: "#indiemaker", volume: "95K posts", competition: "Low" },
        { tag: "#bootstrapped", volume: "67K posts", competition: "Low" },
      ],
    }

    setInsights(mockInsights)
    setIsAnalyzing(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="container mx-auto px-6 py-8 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-gray-900">AI Marketing Analysis</h1>
          <p className="text-gray-600">Comprehensive competitor analysis and social media strategy recommendations</p>
        </div>

        {!insights ? (
          <Card className="p-8 bg-white border border-gray-200 neo-shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded bg-red-100 flex items-center justify-center">
                <Target className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Analyze Your Market</h2>
                <p className="text-sm text-gray-600">Enter your product details to get AI-powered insights</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Product Name</label>
                <Input
                  placeholder="e.g., TaskFlow Pro"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  className="border-gray-300 focus:border-red-500 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Product Description</label>
                <Textarea
                  placeholder="Describe your product, its key features, and value proposition..."
                  value={productDescription}
                  onChange={(e) => setProductDescription(e.target.value)}
                  rows={4}
                  className="border-gray-300 focus:border-red-500 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Target Market</label>
                <Input
                  placeholder="e.g., Small business owners, Freelancers, Enterprise teams"
                  value={targetMarket}
                  onChange={(e) => setTargetMarket(e.target.value)}
                  className="border-gray-300 focus:border-red-500 focus:ring-red-500"
                />
              </div>

              <Button
                onClick={handleAnalyze}
                disabled={isAnalyzing || !productName || !productDescription}
                className="w-full bg-red-500 hover:bg-red-600 text-white py-6 text-lg font-bold neo-shadow-red"
              >
                {isAnalyzing ? (
                  <>
                    <Sparkles className="w-5 h-5 mr-2 animate-spin" />
                    Analyzing Market...
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5 mr-2" />
                    Analyze Competitors
                  </>
                )}
              </Button>
            </div>
          </Card>
        ) : (
          <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="p-6 bg-white border border-gray-200 neo-shadow">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded bg-blue-100 flex items-center justify-center">
                    <Users className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Competitors Found</p>
                    <p className="text-3xl font-bold text-gray-900">{insights.competitors.length}</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-white border border-gray-200 neo-shadow">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded bg-purple-100 flex items-center justify-center">
                    <Target className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Audience Segments</p>
                    <p className="text-3xl font-bold text-gray-900">{insights.targetAudience.length}</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-white border border-gray-200 neo-shadow">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded bg-green-100 flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Content Themes</p>
                    <p className="text-3xl font-bold text-gray-900">{insights.contentStrategy.length}</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-white border border-gray-200 neo-shadow">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded bg-yellow-100 flex items-center justify-center">
                    <Hash className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Hashtags</p>
                    <p className="text-3xl font-bold text-gray-900">{insights.hashtagStrategy.length}</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Tabs */}
            <div className="flex gap-2">
              {(["competitors", "strategy", "audience"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    "px-6 py-2.5 rounded font-medium transition-all text-sm",
                    activeTab === tab
                      ? "bg-red-500 text-white neo-shadow-red"
                      : "bg-white text-gray-600 hover:bg-gray-100 neo-shadow",
                  )}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            {activeTab === "competitors" && (
              <div className="space-y-6">
                {insights.competitors.map((competitor, i) => (
                  <Card key={i} className="p-6 bg-white border border-gray-200 neo-shadow-lg">
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            "w-12 h-12 rounded flex items-center justify-center",
                            competitor.platform === "instagram" && "bg-pink-100",
                            competitor.platform === "twitter" && "bg-blue-100",
                            competitor.platform === "reddit" && "bg-orange-100",
                          )}
                        >
                          {competitor.platform === "instagram" && <Instagram className="w-6 h-6 text-pink-600" />}
                          {competitor.platform === "twitter" && <Twitter className="w-6 h-6 text-blue-600" />}
                          {competitor.platform === "reddit" && <MessageSquare className="w-6 h-6 text-orange-600" />}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">{competitor.name}</h3>
                          <Badge className="mt-1 bg-gray-100 text-gray-700 border border-gray-300">
                            {competitor.platform}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Followers</p>
                        <p className="text-2xl font-bold text-gray-900">{competitor.followers}</p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <h4 className="font-semibold text-gray-900">Strengths</h4>
                        </div>
                        <ul className="space-y-2">
                          {competitor.strengths.map((strength, j) => (
                            <li key={j} className="text-sm text-gray-600 flex items-start gap-2">
                              <span className="text-green-500">•</span>
                              {strength}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <AlertCircle className="w-5 h-5 text-orange-600" />
                          <h4 className="font-semibold text-gray-900">Weaknesses</h4>
                        </div>
                        <ul className="space-y-2">
                          {competitor.weaknesses.map((weakness, j) => (
                            <li key={j} className="text-sm text-gray-600 flex items-start gap-2">
                              <span className="text-orange-500">•</span>
                              {weakness}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3">Top Hashtags</h4>
                      <div className="flex flex-wrap gap-2">
                        {competitor.topHashtags.map((tag, j) => (
                          <Badge key={j} variant="outline" className="bg-blue-50 border-blue-300 text-blue-700">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Recent Posts</h4>
                      <div className="space-y-3">
                        {competitor.recentPosts.map((post, j) => (
                          <div key={j} className="p-4 bg-gray-50 rounded border border-gray-200">
                            <p className="text-sm text-gray-700 mb-2">{post.content}</p>
                            <div className="flex items-center gap-2">
                              <TrendingUp className="w-4 h-4 text-green-600" />
                              <span className="text-xs text-gray-600">
                                {post.engagement.toLocaleString()} engagements
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {activeTab === "strategy" && (
              <div className="space-y-6">
                <Card className="p-6 bg-white border border-gray-200 neo-shadow-lg">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded bg-purple-100 flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-purple-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">AI Recommendations</h3>
                  </div>
                  <div className="space-y-3">
                    {insights.recommendations.map((rec, i) => (
                      <div key={i} className="flex items-start gap-3 p-4 bg-purple-50 rounded border border-purple-200">
                        <ArrowRight className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-gray-700">{rec}</p>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="p-6 bg-white border border-gray-200 neo-shadow-lg">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded bg-green-100 flex items-center justify-center">
                      <MessageSquare className="w-5 h-5 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Content Strategy</h3>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    {insights.contentStrategy.map((strategy, i) => (
                      <div key={i} className="p-4 bg-gray-50 rounded border border-gray-200">
                        <h4 className="font-semibold text-gray-900 mb-2">{strategy.theme}</h4>
                        <p className="text-sm text-gray-600 mb-3">Frequency: {strategy.frequency}</p>
                        <div className="flex flex-wrap gap-2">
                          {strategy.platforms.map((platform, j) => (
                            <Badge key={j} className="bg-green-500 text-white">
                              {platform}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="p-6 bg-white border border-gray-200 neo-shadow-lg">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded bg-yellow-100 flex items-center justify-center">
                      <Hash className="w-5 h-5 text-yellow-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Hashtag Strategy</h3>
                  </div>
                  <div className="space-y-3">
                    {insights.hashtagStrategy.map((tag, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded border border-gray-200"
                      >
                        <div className="flex items-center gap-3">
                          <Badge variant="outline" className="bg-blue-50 border-blue-300 text-blue-700 font-mono">
                            {tag.tag}
                          </Badge>
                          <span className="text-sm text-gray-600">{tag.volume}</span>
                        </div>
                        <Badge
                          className={cn(
                            tag.competition === "High" && "bg-red-100 text-red-700 border-red-300",
                            tag.competition === "Medium" && "bg-yellow-100 text-yellow-700 border-yellow-300",
                            tag.competition === "Low" && "bg-green-100 text-green-700 border-green-300",
                          )}
                          variant="outline"
                        >
                          {tag.competition}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            )}

            {activeTab === "audience" && (
              <Card className="p-6 bg-white border border-gray-200 neo-shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded bg-blue-100 flex items-center justify-center">
                    <Users className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Target Audience Segments</h3>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  {insights.targetAudience.map((audience, i) => (
                    <div key={i} className="p-6 bg-blue-50 rounded border-2 border-blue-200">
                      <div className="flex items-center gap-2 mb-4">
                        <Award className="w-5 h-5 text-blue-600" />
                        <h4 className="font-bold text-gray-900">{audience.segment}</h4>
                      </div>
                      <div className="mb-4">
                        <p className="text-sm text-gray-600 mb-1">Estimated Size</p>
                        <p className="text-2xl font-bold text-blue-600">{audience.size}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900 mb-2">Key Interests</p>
                        <div className="flex flex-wrap gap-2">
                          {audience.interests.map((interest, j) => (
                            <Badge key={j} className="bg-blue-500 text-white">
                              {interest}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            <Button
              onClick={() => {
                setInsights(null)
                setProductName("")
                setProductDescription("")
                setTargetMarket("")
              }}
              variant="outline"
              className="w-full py-6 text-lg font-medium"
            >
              New Analysis
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
