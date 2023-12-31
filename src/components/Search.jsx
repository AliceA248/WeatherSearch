import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Weather from "./Weather";
import Forecast from "./Forecast";

const fetchWeatherData = async (city, API_key) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}&units=metric`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const fetchForecastData = async (city, API_key) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_key}&units=metric`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default function Search() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState({});
  const [forecast, setForecast] = useState({});
  const [error, setError] = useState(null);
  const API_key = import.meta.env.VITE_API_KEY;

  const handleSearch = async () => {
    if (!city) {
      setError("Por favor, digite o nome da cidade.");
      return;
    }

    try {
      setError(null);
      const [weatherResponse, forecastResponse] = await Promise.all([
        fetchWeatherData(city, API_key),
        fetchForecastData(city, API_key),
      ]);

      if (!weatherResponse.name) {
        setError("Cidade não encontrada. Por favor, digite um nome de cidade existente.");
        return;
      }

      setWeather(weatherResponse);
      setForecast(forecastResponse);
    } catch (error) {
      setError("Ocorreu um erro ao buscar os dados meteorológicos. Tente novamente mais tarde.");
      console.error('Error data', error);
    }
  };

  return (
    <Body>
      <h1>Levo um casaquinho?</h1>
      <SearchContainer>
        <Input
          type="text"
          placeholder="Nome da cidade"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <SearchButton onClick={handleSearch}>Buscar</SearchButton>
      </SearchContainer>
      {error && <ErrorText>{error}</ErrorText>}
      <Weather weather={weather} />
      <Forecast forecast={forecast} />
    </Body>
  );
}

const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  margin-top: 40px;
  text-align: center;
  
  h1 {
    color: #3232A7;
    font-size: 40px;
    font-weight: 800;
    font-family: 'Nunito Sans', sans-serif;
    margin-bottom: 20px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  }
  @media (max-width: 768px) {
    h1 {
      font-size: 30px;
    }
  }
`;

const SearchContainer = styled.div`
  display: flex;
  width: 40%;
  margin-top: 20px;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 768px) {
    width: 80%;
    flex-direction: column;
  }
`;

const Input = styled.input`
  flex: 1;
  border: none; 
  border-bottom: 2px solid #3232A7;
  font-size: 20px;
  padding: 10px;
  max-width: 500px;
  outline: none; 

  &::placeholder {
    font-size: 20px;
    color: #777373;
  }

  &:focus::placeholder {
    color: transparent;
  }

  
  &:focus {
    border-bottom: 2px solid #1E1E72; 
  }
`;

const SearchButton = styled.button`
  border: 1px solid #3232A7;
  background-color: #3232A7;
  color: #FFFFFF;
  font-size: 20px;
  padding: 10px;
  cursor: pointer;

  &:hover {
    background-color: #1E1E72;
  }

  @media (max-width: 768px) {
    margin-top: 10px;
    width: 80%;
  }
`;
