## Project Introduction 
: 만들고 싶은 동아리를 만들거나, 참여하고 싶은 분야의 동아리에 참여하기 위한 서비스입니다.


## Skill
<div>
  <img src="https://img.shields.io/badge/html5-E34F26?style=flat&logo=html5&logoColor=white"/>
<img src="https://img.shields.io/badge/css3-1572B6?style=flat&logo=css3&logoColor=white"/>
<img src="https://img.shields.io/badge/javascript-F7DF1E?style=flat&logo=JavaScript&logoColor=white"/>
</div>
<div>
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=TypeScript&logoColor=white"/>
<img src="https://img.shields.io/badge/nextJs-000000?style=flat&logo=nextdotjs&logoColor=white"/>
 <img src="https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=white"/>
</div>
<div>
  <img src="https://img.shields.io/badge/redux-764ABC?style=flat&logo=redux&logoColor=white"/>
  <img src="https://img.shields.io/badge/tailwindcss-06B6D4?style=flat&logo=tailwindcss&logoColor=white"/>
</div>

## Project UI/UX and Function

1. Index
<div align="center">
  <img src="https://github.com/DChanHong/Club_Front/assets/99067250/af0c1d3b-28eb-4e90-a6c6-e1152b6b55e0" width="400" height="300"/>
  
</div>
<br/>
<div>- 네브바 전체 버튼 클릭 시 , 무한 스크롤로 구현 , 6개씩 데이터 추가로 불러오기</div>
<div>- 네브바 나머지 버튼 클릭 시 , 각 페이지별로 6개씩 데이터 보여주기 , 한 스크롤당 3개페이지 구성</div>
<div>- 카루셀 슬라이더는 slick-slider 라이브러리 사용 및 이미지 클릭 시 css 조절을 통한 모달 창 생성</div>
<br/>
2. Login/Sign
<div align="center">
  <img src="https://github.com/DChanHong/Club_Front/assets/99067250/99b0e7c3-1a69-4f57-b52f-0e3cbb116184" width="300" height="400"/>
  <img src="https://github.com/DChanHong/Club_Front/assets/99067250/01d83cb4-d620-4cfc-b1ce-f8f4800c8906" width="300" height="400"/>
</div>
<br/>
<div>- react-hook-form을 이용해 유효성 검사</div>
<div>- 로그인 성공 시 , JWT 토큰 생성 및 localStorage 및 redux를 이용해 로그인 확인</div>
<br/>


3. Club Entrance Page
<div align="center">
  <img src="https://github.com/DChanHong/Club_Front/assets/99067250/fc60be43-b990-4285-8082-eca086a4b542" width="400" height="400"/>
  <img src="https://github.com/DChanHong/Club_Front/assets/99067250/2dc06723-cf39-42b4-9fb5-93abbab42326" width="400" height="400"/>
</div>
<br/>
<div>- 토큰을 이용해 동아리 참여 여부 확인, 미참여시 콘텐츠 가리기</div>
<div>- 스케쥴 추가 시 react-modal 라이브러리를 사용한 모달 창 생성</div>
<div>- 각 스케쥴에는 댓글 기능 제공</div>
<div>- 호스트 전용 배경화면 변경 기능 제공</div>
<div>- 참여자를 위한 socket.io를 이용해 단체 채팅방 기능 제공</div>
<br/>
4. MyPage
<div align="center">
  <img src ="https://github.com/DChanHong/Club_Front/assets/99067250/493c4745-fcea-410f-baed-905d8e53fa0c" width="500" heigth="500"/>
</div>
<br/>
<div>- 회원 탈퇴 기능 제공 , 데이터 보관읠 위해 DELETE가 아닌 UPDATE로 회원 탈퇴 유무 구분</div>
<div>- 프로필 변경 기능 및 참여중 동아리 리스트 제공</div>


