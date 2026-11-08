import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { modifierAnnonce, obtenirAnnonceParId } from "../services/annonceService";
import { obtenirVilles } from "../services/villeService";

function ModifierAnnonce() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [villes, setVilles] = useState([]);
  const [message, setMessage] = useState("");

  const [formulaire, setFormulaire] = useState({
    type: "logement",
    titre: "",
    ville: "",
    quartier: "",
    proximiteFaculte: "",
    prix: "",
    nombreChambresDisponibles: "",
    description: "",
  });

  useEffect(() => {
    if (!token) {
      navigate("/connexion");
      return;
    }

    Promise.all([
      obtenirAnnonceParId(id),
      obtenirVilles()
    ])
      .then(([annonceResponse, villesResponse]) => {
        const a = annonceResponse.data;

        setVilles(villesResponse.data);

        setFormulaire({
          type: a.type || "logement",
          titre: a.titre || "",
          ville: a.ville || "",
          quartier: a.quartier || "",
          proximiteFaculte: a.proximiteFaculte || "",
          prix: a.prix ?? "",
          nombreChambresDisponibles:
            a.nombreChambresDisponibles ?? "",
          description: a.description || "",
        });
      })
      .catch((err) => {
        setMessage(
          err.response?.data?.message ||
          "Impossible de charger l'annonce"
        );
      });
  }, [id, navigate, token]);

  const gererChangement = (e) => {
    setFormulaire({
      ...formulaire,
      [e.target.name]: e.target.value
    });
  };

  const gererEnvoi = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      await modifierAnnonce(id, formulaire, token);

      setMessage("Annonce modifiée avec succès !");

      setTimeout(() => {
        navigate(`/annonces/${id}`);
      }, 800);
    } catch (err) {
      setMessage(
        err.response?.data?.message ||
        "Erreur lors de la modification"
      );
    }
  };

  return (
    <div className="page">
      <div className="surface-card form-card">

        <h2>Modifier l'annonce</h2>

        <form onSubmit={gererEnvoi}>

          <div className="field">
            <label>Type d'annonce</label>

            <select
              name="type"
              value={formulaire.type}
              onChange={gererChangement}
            >
              <option value="logement">
                Je propose un logement
              </option>

              <option value="recherche_colocation">
                Je cherche une colocation
              </option>
            </select>
          </div>

          <div className="field">
            <label>Titre</label>

            <input
              name="titre"
              value={formulaire.titre}
              onChange={gererChangement}
              required
            />
          </div>

          <div className="field">
            <label>Ville</label>

            <select
              name="ville"
              value={formulaire.ville}
              onChange={gererChangement}
              required
            >
              <option value="">
                Choisir une ville
              </option>

              {villes.map((v) => (
                <option key={v._id} value={v.nom}>
                  {v.nom}
                </option>
              ))}
            </select>
          </div>

          <div className="field">
            <label>Quartier</label>

            <input
              name="quartier"
              value={formulaire.quartier}
              onChange={gererChangement}
            />
          </div>

          <div className="field">
            <label>Proximité de la faculté</label>

            <input
              name="proximiteFaculte"
              value={formulaire.proximiteFaculte}
              onChange={gererChangement}
            />
          </div>

          <div className="field">
            <label>Prix (DT)</label>

            <input
              name="prix"
              type="number"
              min="0"
              value={formulaire.prix}
              onChange={gererChangement}
              required
            />
          </div>

          {formulaire.type === "logement" && (
            <div className="field">
              <label>Chambres disponibles</label>

              <input
                name="nombreChambresDisponibles"
                type="number"
                min="0"
                value={formulaire.nombreChambresDisponibles}
                onChange={gererChangement}
              />
            </div>
          )}

          <div className="field">
            <label>Description</label>

            <textarea
              name="description"
              rows={5}
              value={formulaire.description}
              onChange={gererChangement}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
          >
            Enregistrer les modifications
          </button>

          <button
            type="button"
            className="btn btn-outline"
            style={{ marginLeft: 10 }}
            onClick={() => navigate(`/annonces/${id}`)}
          >
            Annuler
          </button>

        </form>

        {message && (
          <p className="message">
            {message}
          </p>
        )}

      </div>
    </div>
  );
}

export default ModifierAnnonce;