import styled from "styled-components";

export const StyledStage = styled.div`
  display: grid;
  grid-template-rows: repeat(
    ${(props) => props.height},
    calc(25vw / ${(props) => props.width})
  );

  grid-template-columns: repeat(${(props) => props.width}, 1fr);

  grid-gap: 1px;
  border: 2px solid #333;
  width: 100%;
  max-width: 25vw;
  background: #111;
`;

// export const StyledStatus = styled.div`
//   color: white;
//   position: absolute;
//   right: 67vw;
//   top: 50vh;
//   font-family: Pixel, Arial, Helvetica, sans-serif;
//   /* font-size: 5vh; */
// `;
export const StyledStatus = styled.div`
  color: white;
  position: relative;
  left: calc(4.5 * 25vw / ${(props) => props.width});
  top: calc(8.5 * 50vw / ${(props) => props.height});
  font-family: Pixel, Arial, Helvetica, sans-serif;
  /* font-size: 5vh; */
`;

export const StyledStageContainer = styled.div`
  /* display: flex; */
  /* align-items: center;
  justify-content: center;
  flex-direction: column; */
`;