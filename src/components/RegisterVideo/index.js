import { StyledRegisterVideo } from "./styles";
import React from "react";
import { createClient } from "@supabase/supabase-js";

function useForm(propsDoForm) {
  const [values, setValues] = React.useState(propsDoForm.initialValues);

  return {
    values,
    handleChange: (evento) => {
      console.log(evento.target);
      const value = evento.target.value;
      const name = evento.target.name;
      setValues({
        ...values,
        [name]: value,
      });
    },
    clearForm() {
      setValues({});
    },
  };
}

const PROJECT_URL = "https://ghdkkqzqxvtomxsrrbec.supabase.co";
const PUBLIC_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdoZGtrcXpxeHZ0b214c3JyYmVjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgyMTUxNjcsImV4cCI6MTk4Mzc5MTE2N30.bdyV1fNq2Cf0afahwPyd8IAbX-M7-OmjxDBnPV6PyQo";

const supabase = createClient(PROJECT_URL, PUBLIC_KEY);

function getThumbnail(url) {
  return `https://img.youtube.com/vi/${url.split("v=")[1]}/hqdefault.jpg`;
}

export default function RegisterVideo() {
  const formCadastro = useForm({
    initialValues: {
      titulo: "Frost punk",
      url: "https://www.youtube.com/watch?v=QsqatJxAUtk",
    },
  });
  const [formVisivel, setFormVisivel] = React.useState(false);

  return (
    <StyledRegisterVideo>
      <button className="add-video" onClick={() => setFormVisivel(true)}>
        +
      </button>
      {formVisivel ? (
        <form
          onSubmit={(evento) => {
            evento.preventDefault();

            supabase
              .from("video")
              .insert({
                title: formCadastro.values.titulo,
                url: formCadastro.values.url,
                thumb: getThumbnail(formCadastro.values.url),
                playlist: "jogos",
              })
              .then((oqueveio) => {
                console.log(oqueveio);
              })
              .catch((err) => {
                console.log(err);
              });
            setFormVisivel(false);
            formCadastro.clearForm();
          }}
        >
          <div>
            <button
              type="button"
              className="close-modal"
              onClick={() => setFormVisivel(false)}
            >
              X
            </button>
            <input
              placeholder="Titulo do vídeo"
              name="titulo"
              value={formCadastro.values.titulo}
              onChange={formCadastro.handleChange}
            />
            <input
              placeholder="URL"
              name="url"
              value={formCadastro.values.url}
              onChange={formCadastro.handleChange}
            />
            <button type="submit">Cadastrar</button>
          </div>
        </form>
      ) : (
        false
      )}
    </StyledRegisterVideo>
  );
}
