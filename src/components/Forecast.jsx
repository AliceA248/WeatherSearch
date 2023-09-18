import dayjs from "dayjs";
import 'dayjs/locale/pt'
import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";
import styled from "styled-components";
import PropTypes from 'prop-types';

export default function Forecast({ forecast: { list } }) {
  if (!list) return <ForecastContainer display={'none'} />;

  const formattedData = list.map(thisForecast => ({
    days: dayjs(thisForecast.dt_txt).locale('pt').format("DD/MM (ddd)"),
    temp: thisForecast.main.temp
  }));

  return (
    <ForecastContainer>
      <ChartWrapper>
        <LineChart
          width={650}
          height={400}
          data={formattedData}
          margin={{
            top: 30,
            right: 40,
            left: -20,
            bottom: 10
          }}
        >
          <XAxis dataKey="days" />
          <YAxis dataKey="temp" />
          <Tooltip />
          <Line type="monotone" dataKey="temp" stroke="#FF8826" activeDot={{ r: 8 }} />
        </LineChart>
      </ChartWrapper>
      <ForecastH>Previsão a cada 3 horas para os próximos dias (°C)</ForecastH>
    </ForecastContainer>
  );
}

Forecast.propTypes = {
  forecast: PropTypes.shape({
    list: PropTypes.arrayOf(
      PropTypes.shape({
        main: PropTypes.shape({ temp: PropTypes.number.isRequired, }).isRequired,
        dt_txt: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

const ForecastContainer = styled.div`
  display: ${(props) => props.display || 'block'};
  text-align: center;
  margin-bottom: 30px;
`;

const ChartWrapper = styled.div`
  width: 100%;
  max-width: 650px;
  margin: 0 auto;
`;

const ForecastH = styled.h2`
  font-family: 'Nunito Sans', sans-serif;
  font-size: 20px;
  font-weight: 600;
  color: #5c4e43;
  margin-top: 20px;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;