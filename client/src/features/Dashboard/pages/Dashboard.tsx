import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Grid, Typography, Card, CardContent } from '@mui/material';
import Layout from "../../../components/Layout";
import InternalHeader from "../../../components/Layout/components/InternalHeader";

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const listOptions = [
  { key: 1, value: 1, label: 'Soja' },
  { key: 2, value: 2, label: 'Milho' },
  { key: 3, value: 3, label: 'Algodão' },
  { key: 4, value: 4, label: 'Café' },
  { key: 5, value: 5, label: 'Cana de Açúcar' }
];

export default function Dashboard() {
  const [data, setData] = useState<any[]>([]);
  const [states, setStates] = useState<{ [key: string]: number }>({});
  const [cultures, setCultures] = useState<{ [key: string]: number }>({
    1: 0, 2: 0, 3: 0, 4: 0, 5: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/data');
        if (!response.ok) throw new Error('Erro ao buscar dados.');
        const data = await response.json();
        setData(data);

        const stateCounts: { [key: string]: number } = {};
        data.forEach((item: any) => {
          const state = item.Estado;
          if (state) {
            stateCounts[state] = (stateCounts[state] || 0) + 1;
          }
        });
        setStates(stateCounts);

        const cultureCounts: { [key: string]: number } = { ...cultures };
        data.forEach((item: any) => {
          item['Culturas plantadas'].forEach((cultureId: number) => {
            if (cultureCounts[cultureId] !== undefined) {
              cultureCounts[cultureId]++;
            }
          });
        });
        setCultures(cultureCounts);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const createPieChartData = (labels: string[], data: number[]) => ({
    labels,
    datasets: [{
      data,
      backgroundColor: [
        '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'
      ],
      borderColor: '#fff',
      borderWidth: 1,
    }],
  });

  const statesLabels = Object.keys(states).map(key => key);
  const statesData = Object.values(states);

  const culturesLabels = listOptions.map(option => option.label);
  const culturesData = listOptions.map(option => cultures[option.value] || 0);

  const agricultureArea = data.reduce((total, item) => total + (item['Área de agricultura em ha'] || 0), 0);
  const vegetationArea = data.reduce((total, item) => total + (item['Área de vegetação em ha'] || 0), 0);
  const totalArea = data.reduce((total, item) => total + (item['Área total da Fazenda em ha'] || 0), 0);

  const agriculturePercentage = (agricultureArea / totalArea) * 100 || 0;
  const vegetationPercentage = (vegetationArea / totalArea) * 100 || 0;

  const areaLabels = ['Agricultura', 'Vegetação'];
  const areaData = [agriculturePercentage, vegetationPercentage];

  return (
    <Layout marginLayout={true}>
      <InternalHeader title={'Dashboard'} />
      <div style={{ height: 600, width: '100%' }}>
        <Grid container>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ boxShadow: 4, margin: 2 }}>
              <CardContent>
                <Typography variant="h6">Total de Fazendas</Typography>
                <Typography variant="h4">{data.length}</Typography>
              </CardContent>
            </Card>
            <Card sx={{ boxShadow: 4, margin: 2 }}>
              <CardContent>
                <Typography variant="h6">Total em Hectares</Typography>
                <Typography variant="h4">{totalArea}</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ boxShadow: 4, margin: 2 }}>
              <CardContent>
                <Typography variant="h6">Total de Fazendas por Estado</Typography>
                <Pie data={createPieChartData(statesLabels, statesData)} />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ boxShadow: 4, margin: 2 }}>
              <CardContent>
                <Typography variant="h6">Total de Fazendas por Cultura</Typography>
                <Pie data={createPieChartData(culturesLabels, culturesData)} />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ boxShadow: 4, margin: 2 }}>
              <CardContent>
                <Typography variant="h6">Agricultura vs Vegetação</Typography>
                <Pie data={createPieChartData(areaLabels, areaData)} />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </Layout>
  );
}