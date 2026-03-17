import { Link } from 'react-router-dom'
import HeroCarousel from '../components/HeroCarousel'
import FeatureCard from '../components/FeatureCard'

function HomePage() {
  const features = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
      ),
      title: '실시간 알림',
      description: '새로운 콘서트가 등록되면 이메일로 바로 알려드립니다.',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
        </svg>
      ),
      title: '맞춤 키워드',
      description: '좋아하는 아티스트나 공연장을 키워드로 등록하세요.',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: '빠른 티켓팅',
      description: '누구보다 빠르게 티켓 오픈 소식을 받아보세요.',
    },
  ]

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center">
        <HeroCarousel />
        
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-2xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight animate-slide-up">
              콘서트 소식,<br />
              <span className="text-primary">가장 먼저</span> 받아보세요
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed animate-slide-up" style={{ animationDelay: '0.1s' }}>
              좋아하는 아티스트의 콘서트가 열리면<br />
              이메일로 바로 알려드립니다.
            </p>
            <div className="mt-8 flex flex-wrap gap-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <Link
                to="/login"
                className="px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors"
              >
                지금 시작하기
              </Link>
              <Link
                to="/keywords"
                className="px-6 py-3 bg-secondary text-foreground font-medium rounded-lg border border-border hover:bg-muted transition-colors"
              >
                키워드 등록하기
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-secondary">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              어떻게 작동하나요?
            </h2>
            <p className="mt-4 text-muted-foreground">
              간단한 3단계로 콘서트 알림을 받아보세요
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">회원가입</h3>
              <p className="text-muted-foreground">
                간단하게 이메일로 가입하세요
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">키워드 등록</h3>
              <p className="text-muted-foreground">
                알림받고 싶은 아티스트를 등록하세요
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">알림 수신</h3>
              <p className="text-muted-foreground">
                콘서트가 열리면 이메일로 알려드려요
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              주요 기능
            </h2>
            <p className="mt-4 text-muted-foreground">
              떴콘이 제공하는 핵심 기능들
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary/5 border-y border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            좋아하는 아티스트의 콘서트,<br />
            이제 놓치지 마세요
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            지금 바로 키워드를 등록하고 가장 먼저 소식을 받아보세요
          </p>
          <Link
            to="/login"
            className="inline-block mt-8 px-8 py-4 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors"
          >
            무료로 시작하기
          </Link>
        </div>
      </section>
    </div>
  )
}

export default HomePage
