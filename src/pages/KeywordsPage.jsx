import { useState } from 'react'
import KeywordInput from '../components/KeywordInput'
import KeywordList from '../components/KeywordList'

function KeywordsPage() {
  // Mock data - will be fetched from API Gateway
  const [keywords, setKeywords] = useState([
    { id: '1', text: 'BTS', createdAt: '2024-01-15' },
    { id: '2', text: 'BLACKPINK', createdAt: '2024-01-14' },
    { id: '3', text: 'IU', createdAt: '2024-01-10' },
  ])
  const [isLoading, setIsLoading] = useState(false)

  // Mock auth state - will be connected to Cognito
  const isLoggedIn = true

  const handleAddKeyword = async (text) => {
    if (!text.trim()) return
    
    setIsLoading(true)
    try {
      // TODO: Call API Gateway to add keyword
      // POST /keywords { keyword: text }
      await new Promise(resolve => setTimeout(resolve, 500))
      
      const newKeyword = {
        id: Date.now().toString(),
        text: text.trim(),
        createdAt: new Date().toISOString().split('T')[0],
      }
      setKeywords(prev => [newKeyword, ...prev])
    } catch (err) {
      console.error('Failed to add keyword:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteKeyword = async (id) => {
    setIsLoading(true)
    try {
      // TODO: Call API Gateway to delete keyword
      // DELETE /keywords/{id}
      await new Promise(resolve => setTimeout(resolve, 500))
      
      setKeywords(prev => prev.filter(k => k.id !== id))
    } catch (err) {
      console.error('Failed to delete keyword:', err)
    } finally {
      setIsLoading(false)
    }
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 mx-auto bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
            <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">로그인이 필요합니다</h2>
          <p className="text-muted-foreground mb-6">
            키워드를 관리하려면 먼저 로그인해주세요.
          </p>
          <a
            href="/login"
            className="inline-block px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors"
          >
            로그인하러 가기
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-foreground">키워드 관리</h1>
          <p className="mt-2 text-muted-foreground">
            알림 받고 싶은 아티스트나 공연 키워드를 등록하세요.
            키워드가 포함된 콘서트가 등록되면 이메일로 알려드립니다.
          </p>
        </div>

        {/* Keyword Input */}
        <div className="mb-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <KeywordInput onAdd={handleAddKeyword} isLoading={isLoading} />
        </div>

        {/* Tips Card */}
        <div className="mb-8 p-4 bg-card rounded-xl border border-border animate-slide-up" style={{ animationDelay: '0.15s' }}>
          <h3 className="text-sm font-medium text-card-foreground mb-3 flex items-center gap-2">
            <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            키워드 등록 팁
          </h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">-</span>
              아티스트 이름을 정확하게 입력해주세요 (예: BTS, 아이유, NewJeans)
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">-</span>
              공연장 이름도 키워드로 등록할 수 있어요 (예: 잠실, 올림픽홀)
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">-</span>
              영문/한글 모두 등록 가능합니다
            </li>
          </ul>
        </div>

        {/* Keyword List */}
        <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">
              등록된 키워드
              <span className="ml-2 text-sm font-normal text-muted-foreground">
                ({keywords.length}개)
              </span>
            </h2>
          </div>
          <KeywordList 
            keywords={keywords} 
            onDelete={handleDeleteKeyword}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  )
}

export default KeywordsPage
