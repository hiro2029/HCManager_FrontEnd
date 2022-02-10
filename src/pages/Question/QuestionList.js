import {useState, useEffect} from 'react';

import QuestionInfo from '../../components/pages/Questions/QuestionInfo';
import Pagination from '../../components/Pagination/Pagination';

import {SelectPerPage} from '../../components/Pagination/SelectPerPage';
import {PageTitle} from '../../components/Utilities/Title';
import {InfoCardList} from '../../components/Cards/Lists/InfoCardList';
import {PrimaryButton} from '../../components/Buttons/PrimaryButton';
import {AddButtonList} from '../../components/Buttons/Lists/AddButtonList';
import {Anchor} from '../../components/Utilities/Anchor';
import {LoadingWindow} from '../../components/Utilities/Loading';

import {useQuestion} from '../../hooks/useQuestion';
import {usePagination} from '../../hooks/usePagination';

const QuestionList = () => {
  const [loading, setLoading] = useState(true);
  const {perPage, setPerPage, offset, setOffset} = usePagination();
  const {questions, setQuestions, getQuestions} = useQuestion();

  useEffect(() => {
    setOffset(0);
    setLoading(true);
    getQuestions().then(() => setLoading(false));
  }, []);

  return loading ? (
    <LoadingWindow />
  ) : (
    <div className='Body'>
      <PageTitle color='orange'>問題一覧</PageTitle>
      <Pagination setOffset={setOffset} dataleng={questions ? questions.length : 0} perPage={perPage}></Pagination>
      <AddButtonList>
        <PrimaryButton color='primary' sizeX='large' sizeY='small'>
          記述問題作成
        </PrimaryButton>
        <Anchor to='/question/create/blank' color='white'>
          <PrimaryButton color='primary' sizeX='large' sizeY='small'>
            空欄問題作成
          </PrimaryButton>
        </Anchor>
      </AddButtonList>
      <SelectPerPage perPage={perPage} setPerPage={setPerPage} />
      {questions ? (
        <InfoCardList>
          {questions.slice(offset, Number(offset) + Number(perPage)).map((data) => (
            <QuestionInfo data={data} key={data.question_id} setQuestions={setQuestions}></QuestionInfo>
          ))}
        </InfoCardList>
      ) : (
        ''
      )}
      <Pagination setOffset={setOffset} dataleng={questions ? questions.length : 0} perPage={perPage}></Pagination>
    </div>
  );
};

export default QuestionList;
