module Main where

import Prelude
import Control.Monad.Eff (Eff)
import Control.Monad.Eff.Console (CONSOLE, log)
import Data.String (joinWith)

glue :: Array String -> String
glue words = joinWith " " words


main :: forall e. Eff (console :: CONSOLE | e) Unit
main = do
  log (glue ["Happy", "new", "year"])
