import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Landing from './pages/Landing'
import OrphanagesMap from './pages/OrphanagesMap'
import Orphanages from './pages/Orphanage'
import CreateOrphanages from './pages/CreateOrphanage'

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
              <Route path="/" exact component={Landing} />
              <Route path="/app" exact component={OrphanagesMap} />
              <Route path="/app/orphanages/create" exact component={CreateOrphanages} />
              <Route path="/app/orphanages/:id" exact component={Orphanages} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;