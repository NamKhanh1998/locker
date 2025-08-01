import { initializeApp, applicationDefault, cert } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import admin from 'firebase-admin'

const suiFs = {
  projectId: 'bubbosui',
  clientEmail: 'firebase-adminsdk-fbsvc@bubbosui.iam.gserviceaccount.com',
  privateKey:
    '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC3JetUmmKStdNS\nKTi5ACqQ0+3VcoorF0PXmeCGfuPZ8BYEyVd1+49XQEHmibuWQwHjylIi6SnDJS0Y\nk70o2fhXK/PDgvxCmD4SZzdvs/rSsbALjQ+eMnLvtXHC44q7acaUaWZ+vHbwtkFv\nRtYOPMQRZFN0mVs39jSSWrJv9WcR+dg2/qowe3plDf/82tMLz6feanKrY8Q0ifir\n2fkfmjJDCXCcCCMN6Xil1ANgm8iPjKHqK1ZjpqxtEw5ZYaAgzQJQVN8HQF99xTAJ\ny6fyPdF7Ek7z7eUVaZww3THgArMJupQvCE1UoGoOtYLL0bhgvxwmmSnIk6vTDW+b\nD+NcMB9zAgMBAAECggEATqblq7ULTQbxxBB40BYOsZiZxDcGuB+rHl1yS0AV+MN+\nqTqQKVZJhgZN5sPSf+Kx3pHF+UEZkrkV5z6XFwKYgFMbQaSwUacQzRVvfLSVrELr\nn+JJyT3QFzpcKv5N11NDGPw0rIuiJpiWfEO27HFTIEbuAh5TyrIcfJeflq4UP+bI\nPqyzGZp/BdyJ7YhNWCwVh/UKAMlbuW9DVqM9wclyzsrK0Xr0NyO+wU2rA4OoS3Ro\no7iN4V1iWrWaRwS/mN0LyTPHIkJkQOig3Go2nobcjTF3+2+326CQ522ShEq9Aht7\nArqqPcDdprM9GQesukWicg8Do7bNrq0397RagiTS3QKBgQD8EgvIwS6QXU/fUYUE\nILnCXuF8YCVUjIdQwtIb21UG05Qj2QqKnoLTRAYKIs80DWdx/ENrS0lO98mF9VlO\nPFb2uM2oNbjvWviHZsmfu5+9clbeD9xSNJZslD2LOY7hyFFYWcoeZnK/VZm/5zJ+\niTfj4IHePA7pbye/CdZI93O7xwKBgQC6ANH96CJfFj2zIreMr8a5SYAFat8kh8wc\nGQ1IKopgBW9vwE4Jtv/0P2w3h1C5Bwe6r7Ol0khmy1SX8ZQPNGdgczLRtTs++ENy\n7fUlvIvCJKESAM9W0ueCsadS6hiuxQ5tmXCxdknn8UpVj++/7zOah9msS6f4dzMc\n4v6PQENG9QKBgQD3pLsTFkeq6SHJYotuDMCzJwgca1EBibZ/L4fAenFEbaVCur7S\nhPw+lrvgRWaP2wNgRtftl1+ER4gjJXIBnOJLLjBOK8luzk8Qp3k6hthfBPA25hos\nYSHPtqvoFjo7s9PHGx+pUjk1pOGSWY+QJTtVk4HDVfnIeL3xv7ZYpVN8jQKBgE+o\neEZYOxgj60qjjJ44zU+e9a/cRDJd4gEKjZChf19+FGp0njc040sUOmFRlzWWmC3Q\nf4x9kTpMzC7CbBlS5Q7+Zv4+sl/WbPR0im+d3vDHRR/zrthNPI7RTIqK7QU0KWiw\ntP2bXi1yPdaE7TVy2NPOaF+MiyQy0HYHlON+rxFdAoGAKnemHlF5KF+ljTHezdR3\nVGuCuXJOcqJNvrIXfo/qX8ckhepNf2IhHVyBlB9Ej8RAu4aH6sWy1P9vmZn3l/Sj\n0SFTOp/S7wj8sG+8kCSvtrgqMeE9ptbkKGDNSu8iZVWnZNwmOF7CzvPvjwfUr9MG\n1IO8D9RPXpVrCmtk0jfk+Tg=\n-----END PRIVATE KEY-----\n',
}

const solFs = {
  projectId: 'solbubbo',
  clientEmail: 'firebase-adminsdk-fbsvc@solbubbo.iam.gserviceaccount.com',
  privateKey:
    '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCxUjzQsTQSuEmS\n7WtC+PHY4JM38NfPvg42fPFymlSaWSp3hkPS6x6CdvVwcA5WOEwiNbGnOPRKVrtW\n3aYysxylzYfnVL/+Ypc02RZSiPgBB2+lalYyHIerd7/SSUqkQXolH6PJz1muI3wS\njHTAn4ToY+q2oA7zp+U1RWcm7vzKgTnQp0E7RQGDJ45Vtw14w44lX3KBw3eeVeQA\nxu6r+/IJCOW6MVNH9XA8nWZjIeV7IEih7xzTXd6Ns9S93LBzR3JJHND/zSssyS0T\nqj4Cxb8aaDXkim4VD36IF0F/mDWn6gRrHRMRAZi2Iw/gXkEWz5wS8pwwh+PJul5s\nZ2BBABN9AgMBAAECggEAQVA8xVPYDeMieoOH5DHFBzDlGRBVtZfYLVrFJoTRD88z\nFLZ4Sfq/kKeXjRRBO6Hd7SXg62rPlIgw1fSrcHZH4Yx8eAlf9KfE8Tra/Yik7OAb\n0A6EdE3M7SwdFCxZ2Xmir4ThdAazjjBU1ZI1uPOo5V5USHNZPodDpmULcyxJIZ9s\n/KDdvhdB3ARBce+1+160JTr5EmEusKCbpWJn4m1ZgreAv+6jEGaHT/II6o8YRsbs\nDwjlRzUsXGPrY3x3ZXU80kBDsEE3j7WBaWz5zRnzmUopp+J/ChU4Fiv77hp+WbGa\nJNfX7Gnu/eFDGG7mrzrdY/BZuiMYgbo0n7b98m2G4wKBgQDrTfAxVDTd+xR0r52C\n8IiRYz5vgKD1v9Ub9xSmcwhUyFsb63WvyMWy5CaJGKdA0J4Z2A193cpCH9LcZ5V4\n9t+GfoSdydEMUvaZZd463iDMVfbhFwzqmmmANqwxDXQ9EdNOD4hRPL9zsZofNUQm\nq7gZ6LRworWOeDS66L9gXP0ASwKBgQDA6sM2J8ZgRjNFXFcVPV4ZtJcjTbi6C8XS\nkD3nr8taWv69+8+SItDT5GIiEEM+i9ufOpTXsJSxKU8cY8pgKY7ddBlannNdiFv+\n2USjAKHdjKhRovfDibRuLPqFy3phmxmgCOTSf1yCe1XEDQtyIDQ0Uib9uB3H/LYd\nqe8RQzauVwKBgFrOEfJHZ7t+aG97UhK01k8c+Hw5LGSJ6ijHmg19+OoXA6nrnNgA\nZ+LYTtK7U9gcadbZXKOFEsef1lS+GJ28z5fsfSsTNfxGi+m4uSEIlamlRweoSJDE\nlBApiRvI8GGc3mmSbu3CvrNcB3khqjIuNHazKecJs3zOgLLcnPYIDI6vAoGAI0PG\n44Np0/eBL9CtaoiJRxGn/yAaAIheZRtQ9aVA+wdfQcNiMkiC+/jnp2ppoGlYgEbp\nJnR0+d2fRIVJXUK7hufOKq6EUDi4+GEnFtTqweEQc7vipq/pd6ppMUP83xLHIGX/\nzirR8lgxWWE5Emeoo1fRINgjOYeMkueZeAJdYIkCgYEAghfukzvmzHSdsJgCHVo8\ntVC/rznPhc1mVWN1zIW8+wM84aXkLJKS2BHFkS+fwJGko9riqcSN94mWYDo2GpoI\nmGmfs9ceasZIJKv5Y89yuKB9ukUiLYhfgSLTVQFNR0dTGIPe93l2u7qlUaSF24II\nXJX1OumEwZh4dG4aJ/rrkzQ=\n-----END PRIVATE KEY-----\n',
}

const beraChainFs = {
  projectId: 'bubbobera',
  clientEmail: 'firebase-adminsdk-fbsvc@bubbobera.iam.gserviceaccount.com',
  privateKey:
    '-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDQIEUqcgJuvO+s\nDflmp3TY2WUdTDzwq4jSzLYKZsGcSO3imdROFOLloeUm5/iM+PZLMV6a2+JBAM4D\nRY6vvM171reZwtAT5e+RjX7qEoyJaxoAJVWokc6X4VAZ3NdDuuwPq+vyivfA50WU\nJ70RCu/DXtAfYkQaURyNEeHTF0B6ZFYwWWMu5T4NF9gxLVoqnZONt97oVBQ39p/F\nc9IwvWC+53Lz24cDEIna2p2II8TIJmf2RaAX4CWDWHTgMSUG+bueaUs4KAeNJO1S\ncQorwc34zglvUD1X0sLpentuS6jQ4DSfYdrY4ToufNOmN0+JosWDwE6owZDDccfU\nItxxLYSdAgMBAAECggEALW1Fu4B8AHCzvXGlZJ8bVXOJ6u2nhX5jVGODPlz0WGjg\np2udF9feOHHwQuAx848prvrdI97nkPmcfcFSZhBHJ4cTtvd7FETFWBcywuN+kkXy\nvGJpwmvk1GjE44g84hcsDDWhv+RONGgmWzKbRVuGPrX0pkz8AWR/31iuWjVCiRP1\nTdhiGeaFzv/TmGxnQ0eWlLqXfBpQ9gc89M1peJubsttjABbsF3XTGBCc9QyeXmtf\n4CSBElPUpA5sxMZPFrHI5gLi8lHnn3kYFiZjKQQvgMr34JGJtpXtT7i+6Ck7SoxQ\nzAmHGvvVsYnJSHBOr3NFrC9WN6r/pHGStOqiMxikAQKBgQD7OVTD7n0f9HSm8Vhh\nVkNUuIPy+652ZQvOzFE0iPOVtXeVOF6Rc8yBxCNY5B8mWki52t60S7IWOJOCvYxJ\nzrpeAsVaKjFmSvylzOw5iQfVFb7y+lMf8HsSWLqUGgtKizdfPnKNpF/K9t37Cxth\n5nlw5x3zZVZQ1jfGBQXMv4nenQKBgQDUFTAqRnQYcxMo8N9rkcV5gC68mkgyIDDM\n+0a1R0Vs5KPrqkp/NBWyWUcw7MHCVnZClbMe0stex/+oiFSOrS0lOEh27y8jl3T7\niamNBkc/Hzx/OOTXmvHKAKoF3LWivS3cV8+KsC4h1dERGdv0g5DlKZGW2Xxjk9Rz\nbMjEUZ5eAQKBgQDYZPrJxmzLEKNGhY7uUQKwQDuQGhCd9M3l9IJiMTE4HFaEF0kG\nGuvmPw9/awgV3iDUzl2Uibs9fsA5FpJ3pPVNMy/RSZTBmwfivRAhQxKXDiMrYkol\nsdwg4oLcPU7Kh/5LMRw1O4gz6M8uhdOxUXf7s2hOFlTyToM+M2dahQX51QKBgQCb\n9nT0MdmAfWeyrOhwj8OcJVK5ae/7xMZ+h68o8p+wg7e0QAgG4YOvI46CASpAQxs2\nviX6XeQm8IcnJhKg1eOkQm6v4BdXYjMqI8NnLR3J4qu3l1xa3dw/xBtEsll0sxB9\nwKmkgQl74mSb4dtqRjKRA+/H8mpSRE1xEKfYD3maAQKBgQC40TZgPYsvqL70kTOR\nNeVguQUoA9i319TciiOMoJeXBjqGAIj/pc3OK93H+SPIHXrTB0700q49rgXfewyF\nn5XASLzqLQD8GMsXOm8/61CxQ94tRd0pSXsJpJEPuifd7L25/3yDNB3GOpXOJMyO\nkgCEIaYBl5ofK0MRqmdMjE0mEA==\n-----END PRIVATE KEY-----\n',
}

const raidenxFs = {
  projectId: 'lensai-23401',
  clientEmail: 'firebase-adminsdk-fbsvc@lensai-23401.iam.gserviceaccount.com',
  privateKey:
    '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCvxFlpAGH2e3BH\nduRgpsiXF1HZmFCsAZe/ZXsrTHpprVjERn2XnVF7jsVa3Hn4xs52ebwjgBgh2d6n\nwSoMDlEs2sa0vRJFOZsONlaOnEt79EqY5aihG2o7CYtpGon6kJFBozCjFvk+aOLJ\nZREU7MqC6FVN1ixBKQKoQ7qlu2kyeyuC0OCN5JEhsAnXmmeH4gPGwjsETuEgP4Vj\nYSGv9NpnYSyRH/AvOZSx9yM6UHyrnaI+O1zVSfM6mz9EdIWSI7HupzYwuYgMtSqe\namT+Jkc1MkJ0CjTQ6TQNPboG4mz4G4ZCO4nM3buA2jT/q4mHBesZvYI0wyc3xW6+\njV1C6FXrAgMBAAECggEAIOImLBvTOA7t+aDHp0Fsw7+sI354kUWXA0rUGUysljrF\nIaticcwP44LZb19SPnXLSKULysR7P1IIcvATkr/W9gJULJo24daeKLGHzhR1ltIk\nZqiIvONpI3RsrZQ2fjcvxcznG4v/w2pSC4WqBXUrigQ3eWF5VBN9GMfbEoiWbMgI\nh02L9rErXYitu/bpi9CBt4S/tixLDujVpQ6HrsFrazyhGF9YG2P3Fs6AtuilS+PJ\nrSljM33ZwBtLDskGG/nsefUhI6LmkOOL2/9Nw7NtBitcS7+bbftJdXGGkG9uhimh\nqN6smHIff8BN/eYjSzbqFs1sVGq2vlAKh7OJixn/qQKBgQDs8OOWlAoDabEQxHYy\nqKY+00Wr8Y7851naSfbDrxFY8Mak5ykTNBnQTG0n1Eep3EkkHXpLDwwn6HTNufKA\na40Ce5+BJ5M1IXAhxhon9nT/qaKY1EnjMOuaeofhgQ/Pw6TXX4qYzCn4NGbQQe8+\na7XcNRob5o7M9kJRjFnCLbrGTQKBgQC958KAfJNgCo0s95E/e/5U5FGK+4gjoNCx\nrbItHoj4Re7lWVHS7Db+56qwWZ/sCqrA9p5cUNDMuH/IQDJzn2UhKPV6RAHirUGN\nkBFlnn/CfYsPOFFSPTI00M4w17YIArSH9MlW6WLQugIRCDrWl+UGZrR/N7zQ1BFe\nDWPfmE8ZFwKBgQCX0+hSVfxwoWpX7zw6S/1zZphPjNNuVaUrDpg0XltEXc08X+/f\nIVSlOEP98LYXL1Qi80ypCjRk4jzukwfEqKZMAAF+lmhq9ElRKwsZroDcTswlGGtc\nTL28WGX352bFYH2hkNRUAwelx5ZWPtnaatS3DcP0OvIofmiSrtfZaMo1RQKBgCr4\n/MxyZC8BdDzOsLF672xqVgFrNb1KMK9kLMOE+12jBZIkih1+kltQNRG+1i9loooT\nxHYDW5xXy6KW1FPRp+K/D/1g0kRnDERqa2VhXmu2WPdSuSQw8OF+tona5jgd1JhH\nTiA6o7+zt6/++sGAkbTHHOUEydc/hcaQpR79qjh1AoGBAKW3NJsQEQMB96OS5YIM\nSXwAHVjsxbMJY2kEy6JpQt6b9MhgHyypbLIn1u0nMtNLgRMcfl+q8h7QBNaC1uET\nWIsfkBwpHfgTmuUVmiMGy5V27UFqVC3Fgfz1Dv6saUGjpjemdVcJCT1QK29MC/p3\nC9ydjtpaYhT3ZqILnpMTiKw/\n-----END PRIVATE KEY-----\n',
}

const holdersBubbleMapFs = {
  projectId: 'hoplop-50a5a',
  clientEmail: 'firebase-adminsdk-fbsvc@hoplop-50a5a.iam.gserviceaccount.com',
  privateKey:
    '-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDu3IA3FIPkZ10/\nqcr7KJahFQ8kfLebEP8QzvT978MGE1onZYHZQ3c0ts2q2MyOVAI7+dvGUTNLLlFk\nnKw3bN9fz8veHVDFQVPbsrrBA6AAIH4yJz31gIpigAGvTDzO23mwZ0a+ajrI5z3N\ns26CxmItkxKUWdOlF15FHt5Fp50jLLJdvZsiAR9mOotgRhJqXKoS+oXHdMxvKWs/\nOOzbYaGHxjzvIZEJXJjMrq8+c1fPqvjSKm9DYq81IFBGzjbYFAaENavuwKTgZrR7\nmA1SCvaKL/rit2YWac17B7sxdcNlIuhegegoVNi5Ac9HM5dyeILhdrKbq+ddoKCA\nPGqS91eHAgMBAAECggEACdLRH3+Wy9cObp0lwNeSyyD2sV1c7CH/HRD0SKWw/R56\nbjVbNkHzWwK+1m058gtb18PQxi+C7wjo7KNFSx0Nc/Jm8LiyIJkTtFNKh/Nr6j8F\ndNWVU3PyY3B4et4Ls19mYIFjpCNYgJIcdUnEXHK0b5BlZFGF0uI+DJSwHbULhHpw\neNPs7WDbK5I0OA0xbU2H4SxCMcgRs/YPMTWySH2sRe3UVQ40Kum6Tui1GEeFdR35\nl9ULK6lpxWIAxqyoTQI4KSkOqnS1ArEsCceisgqOkwCdOWV6PVUCA/uLQmnyNCCE\nedvoJQtRkyb3Vgf+QQd6Ka+tj1uUyEYviunf7St+WQKBgQD4LkZFa82s7xhV3Gwz\neC5yjkfL7IR2wCf+CKKA2CwOfktMlOgFpmTHwF8y1Fmz1kcrmhM8zwYNq//kKefs\nfIGdLCkYJx2pHXJa+JP2XxaELDhqoNDrmsTfdkMtzJJ+JivDUDQP3OFNQYqaW2QU\nce84SmEV1UghZdABMZNC/rYpSQKBgQD2Yw9ChBABY4+IOl0gQTewJI4824f41AEA\n7eZ9qTqwDaPel7O3GreR67ioOuS7qwc0W3x5YpyRipeAucjbxBrrfNe8wMWsYv9p\ndqlbggcqdiGPquQl5IuagORFjhvPffuUfSNXR0G3ZdLuH4i0ls+Yr7MMD0/ERano\nI1uPv8XKTwKBgGM4VN3COKsvt6H0CsoU/TTNT0Tm3RqAvjxghV9PjWWJ9l66lXxU\nxqvZa/XtUaOFQlTbN1+zQK9MmXRFkLRKHqOQmSlP0hrfa+2Uvcrcvyq+ZxuyCXR4\nHsdcB4WS6OpIJmzibr38x5JUZq5JZVyLJGFz0xage0Lm6l7fzAkXvgoJAoGAeFtf\ngvCcGPGXlcZc43q4R1U0HkpnG4gEjX2pEE1wm7uuBvg4FAP7FE7/vz41qe8b79mY\n7nrbXMVEyN74XVJojAxKHqxUY6dgeRY8GLVl5roaHuIt3MzN3UWFPOz0bOFv2dNf\nRi1Kztnwtd21m/HnqwB5CDUalBgrrXhIK+pUJkUCgYBmkionwYVZXC9SCXt0LvW6\nTBZFnEeElFqbeHSME5QuQtQ6vjpnfRO1wK/plMGYLg0GIIq3IS6jAn9srUY7UiH0\nSRIFZ9TV1iXXxlVSkCj90baJo7gY5McDiK8rzPpyrScQ52CczWK8ib8ff6uicR7u\nbnHmkw49RNXg6QFyC22QOQ==\n-----END PRIVATE KEY-----\n',
}

if (!admin.apps.length) {
  initializeApp({
    credential: admin.credential.cert(suiFs),
  })
  const db = getFirestore()

  db.settings({
    ignoreUndefinedProperties: true,
  })
}

const db = getFirestore()

const solBubboApp =
  admin.apps.find((app: any) => app.name === 'sol-bubbo-app') ||
  admin.initializeApp(
    {
      credential: cert(solFs),
    },
    'sol-bubbo-app'
  )

const solBubboDb = getFirestore(solBubboApp)

const beraBubboApp =
  admin.apps.find((app: any) => app.name === 'bera-bubbo-app') ||
  admin.initializeApp(
    {
      credential: cert(beraChainFs),
    },
    'bera-bubbo-app'
  )

const beraDb = getFirestore(beraBubboApp)

const raidenxApp =
  admin.apps.find((app: any) => app.name === 'raidenx-bubbo-app') ||
  admin.initializeApp(
    {
      credential: cert(raidenxFs),
    },
    'raidenx-bubbo-app'
  )

const raidenxDb = getFirestore(raidenxApp)

const holdersBubbleMapApp =
  admin.apps.find((app: any) => app.name === 'holdersBubbleMapApp') ||
  admin.initializeApp(
    {
      credential: cert(holdersBubbleMapFs),
    },
    'holdersBubbleMapApp'
  )

const holdersDb = getFirestore(holdersBubbleMapApp)

export { db, beraDb, solBubboDb, raidenxDb, holdersDb }
