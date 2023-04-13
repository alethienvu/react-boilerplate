import UIContext from 'app/context/ui';
import { useContext } from 'react';

function useUI() {
  const context = useContext(UIContext);

  return context;
}

export default useUI;
