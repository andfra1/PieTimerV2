```
te parametry modyfikują ustawienia domyślne!!

      data-rs-pt-end-date="2020 07 25 00:00:00" //data końcowa; kolejno rok, miesiąc, dzień, godziny, minuty, sekundy; spacje i dwkuropki należy zachować tak jak na przykładzie
      data-rs-pt-labels="1" // on - 1; off - 0 dla labelek
      data-rs-pt-size="180" // wielkość zegarów w px
      data-rs-pt-border-color="red" // kolor obwódki podstawowy; zapis koloru dowolny (rgb, rgba, HEX itp)
      data-rs-pt-progress-color="yellow" // kolor progresu; zasada jw.
      data-rs-pt-number-color="green" // kolor liczb; zasada jw.
      data-rs-pt-text-color="red" // kolor labelek; zasada jw.
      data-rs-pt-text-size="35%" // wielkość tekstu labelki; jednostka dowolna (px, %, rem/em);
      data-rs-pt-number-size="20%" // wielkość liczb; zasada jw.
      data-rs-pt-border-size="19" // grubość obramowania zegara w px (nie podajemy na końcu wartości PX!)
      data-rs-pt-label-names='[{"days": "dd"},{"hours": "hh"},{"minutes": "mm"},{"seconds": "ss"}]' // labelki; tutaj decydujesz, które zegary się wyświetlą i jakie będą miały texty; wymagany zapis jak na przykładzie, gdzie klucze: days, hours, minutes, seconds są obligatoryjne, a ich wartości to Twoje wartości; np. [{"days":"dni"},{"seconds":"seckundy"}] wyświetli dwie tarcze z dniami i sekundami oraz podpisami "dni" i "sekundy"
      ```