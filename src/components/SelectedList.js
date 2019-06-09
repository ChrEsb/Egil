import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background-color: #fff;
  padding: 30px 0 0 25px;
  width: 300px;
`;

const AddSelectionButton = styled.button`
  background-color: #dddddd;
  border: none;
  border-radius: 3px;
  color: grey;
  cursor: pointer;
  font-size: 50px;
  height: 75px;
  padding-bottom: 10px;
  width: 75px;
`;

const EmptySelection = styled.div`
  background-color: #dddddd;
  border-radius: 3px;
  height: 75px;
  margin-bottom: 15px;
  width: 75px;
`;

const SelectedContainer = styled.div`
  color: lightslategrey;
  display: flex;
  font-size: 11px;
`;

const SelectedText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 10px;
  padding-bottom: 20px;
`;

const Selected = styled.div`
  border-radius: 3px;
  height: 75px;
  margin-bottom: 15px;
  overflow: hidden;
  width: 75px;
`;

const SelectedList = ({ addEmptySelection, imgRef, selections }) => {
  const canvases = useRef([]);
  useEffect(() => {
    // Draw each canvas.
    const img = imgRef.current;
    canvases.current.forEach((canvas, index) => {
      const ctx = canvas.getContext("2d");
      const [startX, startY] = selections[index].start;
      const [sizeX, sizeY] = selections[index].size;
      ctx.drawImage(img, startX, startY, sizeX, sizeY, 0, 0, 75, 75);
    });
  });

  return (
    <Container>
      {
        //TODO: Find a more suitable key. Using index is an antipattern.
        selections.map((selected, index) => (
          selected ?
            <SelectedContainer key={index}>
              <Selected>
                <canvas ref={ref => (canvases.current[index] = ref)} height="75" width="75"></canvas>
              </Selected>
              <SelectedText>
                <strong>{`Shot ${index+1}`}</strong>
                {`${selected.size[0]} x ${selected.size[1]}`}
              </SelectedText>
            </SelectedContainer>
          :
            <EmptySelection
              key={index}
            />
        ))
      }
      <AddSelectionButton
        onClick={ () => addEmptySelection() }
      >
        <span>+</span>
      </AddSelectionButton>
    </Container>
  );
};

export default SelectedList;
