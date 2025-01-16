import { Date, getDate } from "./Date"
import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
import readingTime from "reading-time"
import { classNames } from "../util/lang"
import { i18n } from "../i18n"
import { JSX } from "preact"
import style from "./styles/contentMeta.scss"

interface ContentMetaOptions {
  /**
   * Whether to display reading time
   */
  showReadingTime: boolean
  showComma: boolean
}

const defaultOptions: ContentMetaOptions = {
  showReadingTime: true,
  showComma: true,
}

export default ((opts?: Partial<ContentMetaOptions>) => {
  // Merge options with defaults
  const options: ContentMetaOptions = { ...defaultOptions, ...opts }

  function ContentMetadata({ cfg, fileData, displayClass }: QuartzComponentProps) {
    const text = fileData.text

    if (text) {
      const segments: (string | JSX.Element)[] = []

      if (fileData.dates) {
        segments.push(<Date date={getDate(cfg, fileData)!} locale={cfg.locale} />)
      }
      // Exibe o autor como um link
      if (fileData.frontmatter?.autor) {
        // Extraímos o nome do autor da frontmatter e o formatamos para criar o link
        const autor = fileData.frontmatter.autor;

        // Mapeando a URL do autor para o formato exportado, assumindo que a estrutura no Obsidian
        // é convertida para URLs amigáveis durante a exportação (o caminho pode variar)
        const autorLink = `/referencias/ibrate/acupuntura-2023-2024/professoras/${encodeURIComponent(autor.toLowerCase().replace(/\s+/g, '-'))}`;

        // Adiciona o link para o autor
        segments.push(
          <a href={autorLink}>
            {autor}
          </a>
        );
      }



      // Display reading time if enabled
      if (options.showReadingTime) {
        const { minutes, words: _words } = readingTime(text)
        const displayedTime = i18n(cfg.locale).components.contentMeta.readingTime({
          minutes: Math.ceil(minutes),
        })
        segments.push(<span>{displayedTime}</span>)
      }

      return (
        <p show-comma={options.showComma} class={classNames(displayClass, "content-meta")}>
          {segments}
        </p>
      )
    } else {
      return null
    }
  }

  ContentMetadata.css = style

  return ContentMetadata
}) satisfies QuartzComponentConstructor
