function KeywordList({ keywords, onDelete, isLoading }) {
  if (keywords.length === 0) {
    return (
      <div className="text-center py-12 px-4 bg-card rounded-xl border border-border">
        <div className="w-16 h-16 mx-auto bg-muted rounded-2xl flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-card-foreground mb-2">
          등록된 키워드가 없습니다
        </h3>
        <p className="text-sm text-muted-foreground">
          위에서 알림받고 싶은 아티스트를 추가해보세요
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {keywords.map((keyword) => (
        <div
          key={keyword.id}
          className="flex items-center justify-between p-4 bg-card rounded-xl border border-border hover:border-primary/30 transition-colors group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
            </div>
            <div>
              <span className="font-medium text-card-foreground">{keyword.text}</span>
              <p className="text-xs text-muted-foreground mt-0.5">
                {keyword.createdAt} 등록
              </p>
            </div>
          </div>
          <button
            onClick={() => onDelete(keyword.id)}
            disabled={isLoading}
            className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100 disabled:opacity-50"
            aria-label={`${keyword.text} 삭제`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      ))}
    </div>
  )
}

export default KeywordList
