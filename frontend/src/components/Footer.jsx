import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="bg-secondary border-t border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <img 
                src="/logo.png" 
                alt="떴콘 로고" 
                className="w-8 h-8 rounded-lg object-cover"
              />
              <span className="text-xl font-bold text-foreground">떴콘</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              원하는 콘서트가 등록되면<br />
              가장 먼저 알려드립니다.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">바로가기</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  홈
                </Link>
              </li>
              <li>
                <Link to="/keywords" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  키워드 관리
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  로그인
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">문의</h3>
            <ul className="space-y-2">
              <li className="text-sm text-muted-foreground">
                support@encorenow.kr
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground text-center">
            2024 떴콘(EncoreNow). All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
