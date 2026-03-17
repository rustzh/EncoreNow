import { useState } from 'react'
import { Link } from 'react-router-dom'

function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    // Validation
    if (isSignUp && password !== confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.')
      setIsLoading(false)
      return
    }

    if (password.length < 8) {
      setError('비밀번호는 8자 이상이어야 합니다.')
      setIsLoading(false)
      return
    }

    try {
      // TODO: Connect to Amazon Cognito
      // For now, simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // After successful auth, redirect to keywords page
      // navigate('/keywords')
      console.log('Auth submitted:', { email, isSignUp })
    } catch (err) {
      setError('인증 중 오류가 발생했습니다. 다시 시도해주세요.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 animate-fade-in">
        {/* Header */}
        <div className="text-center">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <svg 
                viewBox="0 0 24 24" 
                className="w-6 h-6 text-primary-foreground"
                fill="currentColor"
              >
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
          </Link>
          <h1 className="text-3xl font-bold text-foreground">
            {isSignUp ? '회원가입' : '로그인'}
          </h1>
          <p className="mt-2 text-muted-foreground">
            {isSignUp 
              ? '떴콘에 가입하고 콘서트 알림을 받아보세요' 
              : '떴콘에 오신 것을 환영합니다'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                이메일
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-colors"
                placeholder="your@email.com"
              />
              {isSignUp && (
                <p className="mt-1 text-xs text-muted-foreground">
                  이 이메일로 콘서트 알림을 받게 됩니다
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                비밀번호
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete={isSignUp ? 'new-password' : 'current-password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-colors"
                placeholder="8자 이상 입력하세요"
              />
            </div>

            {/* Confirm Password (Sign Up only) */}
            {isSignUp && (
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-foreground mb-2">
                  비밀번호 확인
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-colors"
                  placeholder="비밀번호를 다시 입력하세요"
                />
              </div>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 bg-primary/10 border border-primary/20 rounded-lg">
              <p className="text-sm text-primary">{error}</p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                </svg>
                처리 중...
              </span>
            ) : (
              isSignUp ? '가입하기' : '로그인'
            )}
          </button>

          {/* Toggle Sign Up / Login */}
          <div className="text-center">
            <button
              type="button"
              onClick={() => {
                setIsSignUp(!isSignUp)
                setError('')
                setPassword('')
                setConfirmPassword('')
              }}
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              {isSignUp 
                ? '이미 계정이 있으신가요? 로그인' 
                : '계정이 없으신가요? 회원가입'}
            </button>
          </div>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-background text-muted-foreground">또는</span>
            </div>
          </div>

          {/* Social Login Buttons */}
          <div className="space-y-3">
            {/* Kakao Login */}
            <button
              type="button"
              onClick={() => {
                // TODO: Connect to Amazon Cognito with Kakao OAuth
                console.log('Kakao login clicked')
              }}
              className="w-full flex items-center justify-center gap-3 py-3 bg-[#FEE500] text-[#191919] font-medium rounded-lg hover:bg-[#FDD800] transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3C6.48 3 2 6.48 2 10.8c0 2.76 1.84 5.18 4.6 6.58-.2.74-.72 2.68-.82 3.1-.14.5.18.5.38.36.16-.1 2.5-1.7 3.5-2.38.76.1 1.54.16 2.34.16 5.52 0 10-3.48 10-7.8S17.52 3 12 3z"/>
              </svg>
              카카오로 {isSignUp ? '시작하기' : '로그인'}
            </button>

            {/* Google Login */}
            <button
              type="button"
              onClick={() => {
                // TODO: Connect to Amazon Cognito with Google OAuth
                console.log('Google login clicked')
              }}
              className="w-full flex items-center justify-center gap-3 py-3 bg-white text-gray-700 font-medium rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Google로 {isSignUp ? '시작하기' : '로그인'}
            </button>
          </div>
        </form>

        {/* Additional Info */}
        <div className="mt-8 p-4 bg-card rounded-lg border border-border">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-medium text-card-foreground">알림 이메일 안내</h3>
              <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                가입 시 입력한 이메일 주소로 콘서트 알림이 전송됩니다. 
                정확한 이메일 주소를 입력해주세요.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
