import React from "react";
import PropTypes from 'prop-types';
import styled from "styled-components";

export default function Weather({ weather }) {
  if (!weather.name) {
    return null;
  }

  const { name, main, weather: weatherData } = weather;
  const city = name;
  const temp_now = main.temp;
  const temp_max = main.temp_max;
  const temp_min = main.temp_min;
  const weather_now = weatherData[0].main;

  const weatherColors = {
    Clear: { text: "Céu aberto", color: "#F7F760" },
    Clouds: { text: "Nublado", color: "#777576" },
    Rain: { text: "Chovendo", color: "#0031E7" },
    Snow: { text: "Nevando", color: "#C9C9C9" },
    Thunderstorm: { text: "Tempestade", color: "#7C007C" },
    Drizzle: { text: "Chuviscando", color: "#96CCE8" },
    Mist: { text: "Neblina", color: "#B8B8B8" },
  };

  const { text: weather_now_pt, color: backgroundColor } = weatherColors[weather_now] || {};

  return (
    <WeatherContainer color={backgroundColor}>
      <Content>
        <CityName>{city}</CityName>
        <TemperatureInformation>
          <TemperatureMaxMin>Mínima: {temp_min}°C</TemperatureMaxMin>
          <TemperatureMaxMin>Máxima: {temp_max}°C</TemperatureMaxMin>
        </TemperatureInformation>
      </Content>
      <WeatherInformation>
        <WeatherConditionNow>{weather_now_pt}</WeatherConditionNow>
        <Temperature>{temp_now}°C</Temperature>
      </WeatherInformation>
    </WeatherContainer>
  );
}

Weather.propTypes = {
  weather: PropTypes.shape({
    name: PropTypes.string.isRequired,
    main: PropTypes.shape({
      temp: PropTypes.number.isRequired,
      temp_max: PropTypes.number.isRequired,
      temp_min: PropTypes.number.isRequired,
    }).isRequired,
    weather: PropTypes.arrayOf(
      PropTypes.shape({
        main: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

const WeatherContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 50vw;
  height: 14vh;
  background-color: ${(props) => props.color || '#b34949'};
  border-radius: 20px;
  padding: 25px;
  margin-top: 50px;
  align-items: center;
  max-width: 700px;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 63vw;
    height: 25vh;
    padding: 8px;
    margin-top: 15px;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media (max-width: 768px) {
    align-items: center;
  }
`;

const CityName = styled.h1`
  color: white;
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 15px;

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

const TemperatureInformation = styled.div`
  display: flex;
  flex-direction: column;
`;

const TemperatureMaxMin = styled.h2`
  color: white;
  font-size: 19px;
  font-family: 'Calibri', sans-serif;

  &:not(:last-child) {
    margin-bottom: 10px;
  }
`;

const WeatherInformation = styled.span`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const WeatherConditionNow = styled.h3`
  color: white;
  font-size: 19px;
  font-family: 'Calibri', sans-serif;
  margin-bottom: 5px;
`;

const Temperature = styled.h4`
  color: white;
  font-size: 45px;
  font-family: 'Calibri', sans-serif;

  @media (max-width: 768px) {
    font-size: 36px;
  }
`;
