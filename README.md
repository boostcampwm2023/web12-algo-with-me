# web12-algo-with-me

## 프로젝트 소개
**모두가 참여하고 만들 수 있는 알고리즘 대회 서비스**

[![알고윗미 이동](./algowithme_go.png)](https://www.algo-with-me.site)

## 데모 영상
https://github.com/boostcampwm2023/web12-algo-with-me/assets/39542757/a5462276-4751-45b9-86ee-6dfebec1c629

[유튜브 바로가기](https://www.youtube.com/watch?v=gAqy29KDXzQ)

## 목차
[프로젝트 핵심 기능](#프로젝트-핵심-기능)

[기술적 도전](#기술적-도전)


## 프로젝트 핵심 기능
- 사용자가 제출한 코드 채점
- 실시간으로 대회에 참여한 사람들의 순위 확인


## 기술적 도전

### 백엔드 [🔗바로가기](https://glacier-aura-f95.notion.site/81d32ef434e5496a9dabe4389380a383?pvs=4)
- 한정된 자원으로 최대한 많은 사용자를 수용할 것
  - 아키텍처 최적화
  - 제출, 실시간 순위 데이터 등 통신 비용 절감을 위해 `WebSocket`사용 
  - 실시간 순위 변동 데이터 저장을 위해 `Redis`사용
  - 부하 테스트를 통해 모든 부스트캠프 인원(약200명) 수용이 가능한 것을 확인
 
### 프론트엔드 [🔗바로가기](https://glacier-aura-f95.notion.site/1eacc4a536ff4ff482f35cf0f2e8138e?pvs=4)
- 서버 비용 절감
  - 클라이언트에 JS 런타임 환경 구성을 위해 `WebWorker`와 `WebAssembly`사용
- 클라이언트 환경 동기화
  - 클라이언트와 서버 시간 동기화를 위해 `WebSocket`이용

## 문서 링크

### 협업 전략
- [그라운드 룰](https://glacier-aura-f95.notion.site/4410ed6ddffd4eae8dddbf85209ffe0d?pvs=4)
- [브랜치 전략](https://glacier-aura-f95.notion.site/139ba03369504e3194571f161288a9fd?pvs=4)
- [PR 컨벤션](https://glacier-aura-f95.notion.site/PR-5eed0726451f4cb1875f3130805b6417?pvs=4)
- [커밋 컨벤션](https://glacier-aura-f95.notion.site/d109004dbed6436b8bccf76091e592ee?pvs=4)
- [코드 컨벤션](https://glacier-aura-f95.notion.site/ef62b57f70e6473bae2a7337a4316a71?pvs=4)

### 기획
- [기획/디자인](https://www.figma.com/file/V42mrxheeNAvLQMbbvrZli/%EB%94%94%EC%9E%90%EC%9D%B8?type=design&mode=design&t=GBJdiPhU3claQAHv-0)

### 프로젝트 관리
- [스토리맵 & 백로그](https://www.figma.com/file/gWCcjBIjAStADIuIHnZuFD/%EC%8A%A4%ED%86%A0%EB%A6%AC%EB%A7%B5-%26-%EB%B0%B1%EB%A1%9C%EA%B7%B8?type=whiteboard&t=GBJdiPhU3claQAHv-0)
- [이슈](https://github.com/boostcampwm2023/web12-algo-with-me/issues)
- [회의록](https://glacier-aura-f95.notion.site/83e453ea2271445fb803d370ae95db89?v=7e602674650845f7ae387c47f66899da&pvs=4)
- [개발 문서](https://glacier-aura-f95.notion.site/546cc227d80c4f34ac521e6b0ccdb843?v=c2655197d89f4d609a100c434f08a927&pvs=4)
- [칸반보드](https://github.com/orgs/boostcampwm2023/projects/51/views/1?layout=board)
- [회고](https://glacier-aura-f95.notion.site/8ea4c4fa419e42bd837a4a1785a96374?pvs=4)

### 개발
- [아키텍처](https://www.figma.com/file/Muux6igNnXxpQ2wvXhuuL2/%EC%95%84%ED%82%A4%ED%85%8D%EC%B2%98?type=whiteboard&t=GBJdiPhU3claQAHv-0)
- [FE 기술 스택](https://www.notion.so/FE-aeec2288d5bc4347a3ab1db177d2ae20?pvs=4)
- [BE 기술 스택](https://www.notion.so/c4d9dfa965cd421a866844356d47b693?pvs=4)

## 우리는 이런 경험을 했어요
> 저희가 했던 유의미한 경험을 자랑하고 싶어요.

[QuickJS 엔진은 모든 브라우저에서 동일한 성능 보장할 수 있는가?](https://www.notion.so/QuickJS-10f196d0d4b04e0a98132aeec5b4ba9a?pvs=4)


## 미니 개발 세미나
> **미니 개발 세미나란?**
> 
> 미니 개발 세미나는 *Web12 코드 사피엔스*팀 내부에서 공유 문화를 만들기 위해 시작된 소규모 세미나입니다.
> 5 ~ 10분 동안 자유주제 혹은 프로젝트를 진행하면서 공유하고 싶은 내용을 발표하는 방식으로 진행됩니다.
> 발표자는 팀원들로 구성되지만, 다른 캠퍼들도 자유롭게 듣고 질문할 수 있도록 외부적으로 공개하였습니다.
> 2023/11/08 첫 세미나를 시작으로 5회 진행되었으며, **부스트캠프가 끝나고도 이어갈 예정입니다.**

[미니 개발 세미나 링크 <-- 바로가기](https://glacier-aura-f95.notion.site/6d5e29ae5be3417eb3e963e434b8ec0e?v=9b187ad6575f4eb28de3aa5ee78d6076&pvs=4)

![미니 개발 세미나 5회](./semina.jpg)


## 팀원 소개

| FE | FE | FE | BE | BE |
|:-:|:-:|:-:|:-:|:-:|
| <img src="https://github.com/dev2820.png" width="300px" alt=""/> <br> <sub> **J079 양기조** <br> ([dev2820](https://github.com/dev2820)) | <img src="https://github.com/dmdmdkdkr.png" width="300px" alt=""/> <br> <sub> **J111 이우찬** <br> ([dmdmdkdkr](https://github.com/dmdmdkdkr)) | <img src="https://github.com/mahwin.png" width="300px" alt=""/> <br> <sub> **J140 정유석** <br> ([mahwin](https://github.com/mahwin)) | <img src="https://github.com/rladydgn.png" width="300px" alt=""/> <br> <sub> **J026 김용후** <br> ([rladydgn](https://github.com/rladydgn)) | <img src="https://github.com/yechan2468.png" width="300px" alt=""/> <br> <sub> **J109 이예찬** <br> ([yechan2468](https://github.com/yechan2468)) |

<img src='https://github.com/boostcampwm2023/web12-algo-with-me/assets/78193416/c248c976-1eb3-49a4-bd3a-56ad92d5d639' width='200px' >
