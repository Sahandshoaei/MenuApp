import { Heart } from "lucide-react";
import { useFavorite } from "../../entities/favorite/hooks/useFavorite";
import MenuItemCard from "../../features/customer/menu/MenuItemCard";
import Container from "../../shared/Container";

const FavoritePage = () => {
    
  const { favorites } = useFavorite();

  /* ---------------- Empty State ---------------- */

  if (favorites.length === 0) {
    return (
      <Container
        className="
          flex
          min-h-[60vh]
          flex-col
          items-center
          justify-center
          px-6
          pb-28
        "
      >
        <div
          className="
            mb-4
            flex
            h-20
            w-20
            items-center
            justify-center
            rounded-2xl
          "
          style={{
            background: "var(--color-accent-tint)",
            border:
              "0.5px solid var(--color-border-strong)",
          }}
        >
          <Heart
            size={32}
            style={{
              color: "var(--color-accent)",
            }}
          />
        </div>

        <h3
          className="text-lg font-semibold"
          style={{
            color: "var(--color-text-primary)",
          }}
        >
          No favorites yet
        </h3>

        <p
          className="
            mt-1
            max-w-sm
            text-center
            text-sm
          "
          style={{
            color: "var(--color-text-secondary)",
          }}
        >
          Tap the heart icon on any item
          to save it here.
        </p>
      </Container>
    );
  }

  /* ---------------- Favorites ---------------- */

  return (
    <Container
      className="
        space-y-6
        px-4
        pb-28
        pt-6
      "
    >
      {/* Header */}

      <div
        className="
          flex
          items-center
          justify-between
          border-b
          pb-4
        "
        style={{
          borderColor: "var(--color-border)",
        }}
      >
        <div>
          <h1
            className="
              text-xl
              font-bold
            "
            style={{
              color: "var(--color-text-primary)",
            }}
          >
            Favorites
          </h1>

          <p
            className="mt-1 text-sm"
            style={{
              color: "var(--color-text-secondary)",
            }}
          >
            {favorites.length} saved item
            {favorites.length !== 1
              ? "s"
              : ""}
          </p>
        </div>

        {/* Favorite Icon */}

        <div
          className="
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-lg
          "
          style={{
            background: "var(--color-surface)",
            border:
              "0.5px solid var(--color-border-strong)",
          }}
        >
          <Heart
            size={16}
            fill="var(--color-accent)"
            style={{
              color: "var(--color-accent)",
            }}
          />
        </div>
      </div>

      {/* Favorites Grid */}

      <div
        className="
          grid
          grid-cols-1
          gap-4
          sm:grid-cols-2
          lg:grid-cols-3
        "
      >
        {favorites.map((item) => (
          <MenuItemCard
            key={item.id}
            item={item}
          />
        ))}
      </div>
    </Container>
  );
};

export default FavoritePage;




    //                 FavoritePage
    //                      │
    //                      │ useFavorite()
    //                      ▼
    //             ┌─────────────────┐
    //             │  Favorite       │
    //             │     Entity      │
    //             └────────┬────────┘
    //                      │
    //                      ▼
    //              favoriteSelector
    //                      │
    //                      ▼
    //                Redux Store
    //                      │
    //                      ▼
    //                favorites
    //                      │
    //          ┌───────────┴───────────┐
    //          ▼                       ▼
    //    favorites.length         favorites.map()
    //                                  │
    //                                  ▼
    //                           MenuItemCard
    //                                  │
    //                 ┌────────────────┴──────────────┐
    //                 ▼                               ▼
    //              Favorite                        Cart
    //                 │                               │
    //                 ▼                               ▼
    //          favoriteSlice                    cartSlice