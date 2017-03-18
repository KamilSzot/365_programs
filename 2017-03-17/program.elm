import Html exposing (Html, button, div, text, input)
import Html.Attributes exposing (placeholder)
import Html.Events exposing (onClick, onInput)


main =
  Html.beginnerProgram { model = model, view = view, update = update }


-- MODEL

type alias Model = { cntr: Int, msg: String }

model : Model
model =
  { cntr = 0, msg = ""}




-- UPDATE

type Msg = Increment | Decrement | Change String

update : Msg -> Model -> Model
update msg model =
    case msg of
        Increment ->
            { cntr = model.cntr + 1, msg = model.msg }

        Decrement ->
            { cntr = model.cntr - 1, msg = model.msg }

        Change newValue ->
            { cntr = model.cntr, msg = newValue }
      


-- VIEW

view : Model -> Html Msg
view model =
    div [] [ 
        button [ onClick Decrement ] [ text "-" ],
        div [] [ text (toString model.cntr) ],
        button [ onClick Increment ] [ text "+" ],
        div [] [ 
            input [ placeholder "Type some message", onInput Change ] [],
            div [] [ text(model.msg)]
        ]
    ]  