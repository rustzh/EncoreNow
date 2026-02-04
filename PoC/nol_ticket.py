import requests
from bs4 import BeautifulSoup

def search_interpark_concert(keyword):
    # 1. 인터파크 티켓 통합 검색 URL (콘서트 카테고리에 최적화)
    search_url = f"https://tickets.interpark.com/contents/search?keyword={keyword}&sort=BUY_COUNT_DESC&referrer=search_ticket_shortcut_keyword"
    
    # 2. SRE 관점: 봇 차단 방지를 위한 브라우저 헤더 설정
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
        'Referer': 'https://nol.interpark.com/ticket'
    }

    try:
        # 3. 페이지 요청
        response = requests.get(search_url, headers=headers, timeout=10)
        response.raise_for_status()  # 응답 코드가 200이 아니면 예외 발생
        
        # 4. BeautifulSoup 파싱
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # 인터파크 검색 결과 리스트 아이템 선택 (현재 사이트 구조 기준)
        items = soup.select('div[class*="result-ticket_listWrapper"] a[role="link"]')
                        
        concert_results = []

        for item in items:
            # 콘서트 이름 (data-prd-name 활용)
            title = item.get('data-prd-name', '제목 없음')

            # 콘서트 날짜 (TicketItem_playDate 패턴 활용)
            date_el = item.find('li', class_=lambda x: x and 'TicketItem_playDate' in x)
            date = date_el.get_text(strip=True) if date_el else "날짜 정보 없음"

            # 3. 콘서트 장소 (TicketItem_placeName 패턴 활용)
            place_el = item.find('li', class_=lambda x: x and 'TicketItem_placeName' in x)
            place = place_el.get_text(strip=True) if place_el else "장소 정보 없음"

            # 4. 예매 링크 생성 (data-prd-no 활용)
            prd_no = item.get('data-prd-no')
            link = f"https://tickets.interpark.com/goods/{prd_no}" if prd_no else "링크 없음"

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
    search_keyword = "킥플립"  # 원하는 키워드로 변경 가능
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