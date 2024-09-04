import React from 'react';
import CrudIndex from '../../../components/CrudIndex';

export default function Index() {
  return (
    <CrudIndex 
      model='entry-farms' 
      title='Lista de Fazendas'
      exceptColumns={['state_id']}
      forceShowColumns={['id']}
      aliasLabel={[
        {column: 'id', label: 'Ibge Code'},
        {column: 'state:name', label: 'State'}
      ]}
    />
  );
}