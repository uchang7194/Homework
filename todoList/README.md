## 정리

### 이슈
- IE에서는 transition 사용시 calc 함수가 먹히지가 않음
- 해결방안: transform을 사용
```scss
transform: translateX() translateX() //translateX 중복사용
```