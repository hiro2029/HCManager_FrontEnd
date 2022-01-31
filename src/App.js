// API GitHubリンク: https://github.com/HIT-matsumotolab/HelloC_API

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

//一覧ページ等
import Home from './pages/Home/Home';
import Header from './components/Header';
import GroupList from './pages/Group/GroupList';
import UserList from './pages/User/UserList';
import QuestionList from './pages/Question/QuestionList';
import BookList from './pages/Book/BookList';

//詳細ページ
import GroupDetail from './pages/Group/GroupDetail';
import BookDetail from './pages/Book/BookDetail';
import QuestionDetail from './pages/Question/QuestionDetail';

//問題作成・編集ページ
import CreateBlankQuestion from './pages/Question/create/CreateBlankQuestion';

//ContextのProvider
import {QuestionProvider} from './contexts/QuestionContext';
import {BookProvider} from './contexts/BookContext';

import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <Router>
      <BookProvider>
        <QuestionProvider>
          <MuiThemeProvider>
            <div>
              <Header></Header>
              <Switch>
                {/* 一覧ページのルーティング */}
                <Route exact path='/group'>
                  <GroupList />
                </Route>
                <Route exact path='/users'>
                  <UserList />
                </Route>
                <Route exact path='/questions'>
                  <QuestionList />
                </Route>
                <Route exact path='/teachingMaterials'>
                  <BookList />
                </Route>
                <Route exact path='/'>
                  <Home />
                </Route>

                {/* 詳細ページのルーティング */}

                <Route render={() => <GroupDetail />} path='/group/detail/:id(\d+)' />

                <Route render={() => <BookDetail />} path='/book/detail/:id(\d+)' />

                <Route render={() => <QuestionDetail />} path='/question/detail/:id(\d+)' />

                {/*  問題作成・編集ページのルーティング */}
                <Route render={() => <CreateBlankQuestion />} path='/question/create/blank' />
              </Switch>
            </div>
          </MuiThemeProvider>
        </QuestionProvider>
      </BookProvider>
    </Router>
  );
};

export default App;
