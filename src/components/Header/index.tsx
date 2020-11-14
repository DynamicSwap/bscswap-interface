import { ChainId } from '@thugs-defi/sdk'
import React from 'react'
import { isMobile } from 'react-device-detect'
import { Text } from 'rebass'

import styled from 'styled-components'

import Logo from '../../assets/images/streetswap_logo.png'
import { useActiveWeb3React } from '../../hooks'
import { useDarkModeManager } from '../../state/user/hooks'
import { useETHBalances } from '../../state/wallet/hooks'

import { YellowCard } from '../Card'
import Settings from '../Settings'
import Menu from '../Menu'

import { RowBetween } from '../Row'
import Web3Status from '../Web3Status'

const Nav: React.FC = () => {
  return (
    <StyledNav>
      <StyledNavRow>
        <StyledAbsoluteLink href="https://traphouse.vip">Farm</StyledAbsoluteLink>
        <StyledAbsoluteLink href="https://traphouse.vip/pool">Stake</StyledAbsoluteLink>
      </StyledNavRow>
      <StyledNavRow>
        <StyledAbsoluteLink href="#/swap" className="active">
          Exchange
        </StyledAbsoluteLink>
        <StyledAbsoluteLink href="https://streetswap.info" target="_blank">
          Analytics
        </StyledAbsoluteLink>
      </StyledNavRow>
      <StyledAbsoluteLink href="#/swap" target="_blank">
        NFT Market
      </StyledAbsoluteLink>
    </StyledNav>
  )
}

const StyledNav = styled.nav`
  align-items: center;
  display: flex;
  font-size: 16px;
  line-height: 45px;
  font-weight: 500;
  @media (max-width: 1400px) {
    flex-direction: column;
  }
  @media (max-width: 680px) {
    display: none;
  }
  flex: 1;
  justify-content: center;
`

const StyledNavRow = styled.nav`
  display: flex;
`

const StyledAbsoluteLink = styled.a`
  color: #9797d3;
  padding: 0 27.5px;
  text-decoration: none;
  &:hover {
    color: ${({ theme }) => theme.text6};
  }
  &.active {
    color: ${({ theme }) => theme.text6};
  }
  @media (max-width: 1800px) {
    padding: 0 16px;
  }
`

const HeaderFrame = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  width: 100%;
  top: 0;
  position: absolute;
  z-index: 2;
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    padding: 12px 0 0 0;
    width: calc(100%);
    position: relative;
  `};
`

const HeaderElement = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  justify-content: flex-end;
`

const HeaderLogo = styled(HeaderElement)`
  justify-content: start;
`

const HeaderElementWrap = styled.div`
  display: flex;
  align-items: center;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    margin-top: 0.5rem;
`};
`

const Title = styled.a`
  display: flex;
  align-items: center;
  pointer-events: auto;

  :hover {
    cursor: pointer;
  }
`

const AccountElement = styled.div<{ active: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme, active }) => (!active ? theme.bg1 : theme.bg6)};
  border-radius: 12px;
  white-space: nowrap;

  :focus {
    border: 1px solid blue;
  }
`

const TestnetWrapper = styled.div`
  white-space: nowrap;
  width: fit-content;
  margin-left: 10px;
  pointer-events: auto;
`

const NetworkCard = styled(YellowCard)`
  width: fit-content;
  margin-right: 10px;
  border-radius: 12px;
  padding: 8px 12px;
`

const UniIcon = styled.div`
  transition: transform 0.3s ease;
  :hover {
    transform: rotate(-5deg);
  }
`

const HeaderControls = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex: 1;

  ${({ theme }) => theme.mediaWidth.upToMedium`
    flex-direction: column;
    align-items: flex-end;
  `};
`

const BalanceText = styled(Text)`
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    display: none;
  `};
`

const NETWORK_LABELS: { [chainId in ChainId]: string | null } = {
  [ChainId.MAINNET]: 'Wrong Network',
  [ChainId.RINKEBY]: 'Wrong Network',
  [ChainId.ROPSTEN]: 'Wrong Network',
  [ChainId.GÖRLI]: 'Wrong Network',
  [ChainId.KOVAN]: 'Wrong Network',
  [ChainId.BSC_MAINNET]: null,
  [ChainId.BSC_TESTNET]: 'Testnet'
}

export default function Header() {
  const { account, chainId } = useActiveWeb3React()

  const userEthBalance = useETHBalances([account])[account]
  const [isDark] = useDarkModeManager()

  return (
    <HeaderFrame>
      <RowBetween style={{ alignItems: 'flex-start' }} padding="1rem 1rem 0 1rem">
        <HeaderLogo>
          <Title href=".">
            <UniIcon>
              <img style={{ height: 50 }} src={Logo} alt="logo" />
            </UniIcon>
          </Title>
        </HeaderLogo>
        <Nav />
        <HeaderControls>
          <HeaderElement>
            <TestnetWrapper>
              {!isMobile && NETWORK_LABELS[chainId] && <NetworkCard>{NETWORK_LABELS[chainId]}</NetworkCard>}
            </TestnetWrapper>
            <AccountElement active={!!account} style={{ pointerEvents: 'auto' }}>
              {account && userEthBalance ? (
                <BalanceText style={{ flexShrink: 0 }} pl="0.75rem" pr="0.5rem" fontWeight={500}>
                  {userEthBalance?.toSignificant(4)} BNB
                </BalanceText>
              ) : null}
              <Web3Status />
            </AccountElement>
          </HeaderElement>
          <HeaderElementWrap>
            <Settings />
            <Menu />
          </HeaderElementWrap>
        </HeaderControls>
      </RowBetween>
    </HeaderFrame>
  )
}
