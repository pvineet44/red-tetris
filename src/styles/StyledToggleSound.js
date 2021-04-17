import styled from 'styled-components';

export const StyledToggleSound = styled.div`

    --font-size: 10px;
    position: relative;
    bottom: 17vh;
    left: 35vw;
.toggle {
    position: absolute;
    width: 10em;
	  height: 5em;
  	font-size: var(--font-size); 
    margin: 0;
    filter: opacity(0);
    cursor: pointer;
    z-index: 2;
}

.toggle ~ .switch {
	position: absolute;
	width: 10em;
	height: 5em;
	font-size: var(--font-size); 
	background: linear-gradient(silver, whitesmoke);
	border-radius: 2.5em;
	display: flex;
	align-items: center;
	justify-content: center;
}

.toggle ~ .switch .inner {
	width: 8em;
	height: 3.5em;
	background: linear-gradient(dimgray, silver);
	border-radius: 2em;
	box-shadow: inset 0 0 1.5em rgba(0, 0, 0, 0.5);
	display: flex;
	justify-content: center;
}

.toggle ~ .switch .inner .disc {
	width: 3.5em;
	height: 3.5em;
	background: linear-gradient(to top, silver, whitesmoke);
	border-radius: 50%;
	box-shadow: 0 0.4em 0.6em rgba(0, 0, 0, 0.2);
	position: relative;
	left: -30%;
	display: flex;
	align-items: center;
	justify-content: center;
	transition: 0.5s;
}

.toggle ~ .switch .inner .disc::before {
	content: '🔕';
	position: absolute;
	width: 80%;
	height: 80%;
	background: linear-gradient(silver, whitesmoke);
	border-radius: 50%;
	text-align: center;
	line-height: calc(3.5em * 0.8);
	font-family: sans-serif;
	color: gray;
}

.toggle:checked ~ .switch .inner {
	background: linear-gradient(green, limegreen);
}

.toggle:checked ~ .switch .inner .disc {
	left: 30%;
}

.toggle:checked ~ .switch .inner .disc::before {
	content: '🔔';
	color: limegreen;
}
`;