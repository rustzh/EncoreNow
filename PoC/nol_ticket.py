import requests
from bs4 import BeautifulSoup

def search_interpark_concert(keyword):
    # 1. 인터파크 티켓 통합 검색 URL (콘서트 카테고리에 최적화)
    search_url = f"https://search.interpark.com/search/ticket?q={keyword}"
    
    # 2. SRE 관점: 봇 차단 방지를 위한 브라우저 헤더 설정
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
        'Referer': 'https://ticket.interpark.com/'
    }

    try:
        # 3. 페이지 요청
        response = requests.get(search_url, headers=headers, timeout=10)
        response.raise_for_status()  # 응답 코드가 200이 아니면 예외 발생
        
        # 4. BeautifulSoup 파싱
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # 인터파크 검색 결과 리스트 아이템 선택 (현재 사이트 구조 기준)
        items = soup.select('.searchList .searchItem')
        
        concert_results = []

        for item in items:
            # 공연 제목 추출
            title_tag = item.select_one('.itemName')
            title = title_tag.get_text(strip=True) if title_tag else "제목 없음"
            
            # 공연 정보(날짜, 장소) 추출
            # dt(항목명) 다음의 dd(내용)를 가져옵니다.
            details = item.select('.itemInfoDetail dd')
            date = details[0].get_text(strip=True) if len(details) > 0 else "날짜 미정"
            place = details[1].get_text(strip=True) if len(details) > 1 else "장소 미정"
            
            # 상세 페이지 링크 추출
            link_tag = item.select_one('a')
            link = link_tag['href'] if link_tag else ""
            if link and not link.startswith('http'):
                link = f"https:{link}"

            concert_results.append({
                'title': title,
                'date': date,
                'place': place,
                'link': link
            })
            
        return concert_results

    except Exception as e:
        print(f"❌ 크롤링 중 에러 발생: {e}")
        return []

# --- 테스트 실행 ---
if __name__ == "__main__":
    search_keyword = "아이유"  # 원하는 키워드로 변경 가능
    print(f"🔎 '{search_keyword}' 검색 결과 수집 중...\n")
    
    concerts = search_interpark_concert(search_keyword)
    
    if not concerts:
        print("검색 결과가 없거나 차단되었을 수 있습니다.")
    else:
        for i, c in enumerate(concerts, 1):
            print(f"[{i}] {c['title']}")
            print(f"    📅 기간: {c['date']}")
            print(f"    📍 장소: {c['place']}")
            print(f"    🔗 링크: {c['link']}")
            print("-" * 50)