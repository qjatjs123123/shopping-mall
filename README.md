## 📝 목차
💡  **재사용 가능한 Slick.js 스타일 슬라이더 컴포넌트 구현**

**핵심로직**
- 이미지 리스트 설정
  - 슬라이더에 표시할 기본 이미지 리스트를 정의합니다.
  
- 양 끝에 이미지 클론 추가
  - 슬라이더의 부드러운 순환 효과를 위해, 이미지 리스트 자체를 양옆에 복제하여 추가합니다.
  - 복제된 이미지들이 충분히 넉넉하게 배치되어 있어 자연스럽게 슬라이드 효과를 구현할 수 있습니다.

- 다음과 같이 리스트가 형성됩니다. **(빨간색은 화면에 보이는 이미지)**
![image (2)](https://github.com/user-attachments/assets/82e616a9-d23a-42b4-86fc-a1d71f31d3e2)

- 만약 인덱스가 clone 이미지 위치에 도달한다면 원본 이미지 위치로 변환해줍니다.
  
![image (3)](https://github.com/user-attachments/assets/55e7c086-9046-4b7e-bba8-e0d97a3da821)

- 정리하자면 최대한 가운데에서 슬라이더가 작동하기 때문에 마우스 드래그로 최대한 움직여도 clone 이미지를 보여주게 됩니다.

- 이미지 슬라이더 컴포넌트 [코드 바로보기](https://github.com/qjatjs123123/shopping-mall/blob/main/src/components/Common/ImgSliderComponents.tsx#L1-L212)
  - 버튼 클릭 외에도 마우스 드래그로 슬라이더 기능
    
- 재사 컴포넌트 [코드 바로보기](https://github.com/qjatjs123123/shopping-mall/blob/main/src/components/Sale/MainSaleContainer.tsx#L33-L41)
